<template>
  <div>
    <v-container>
      <div class="flex justify-center">
        <table>
          <tr>
            <th>画像：</th>
            <td>
              <input
                type="file"
                ref="fileInput"
                accept="image/jpeg, image/jpg, image/png"
                style="display: none"
                @change="updateIcon"
              />
              <v-avatar color="indigo">
                <v-icon dark v-if="!photoUrl" @click="changeIcon">
                  mdi-account-circle
                </v-icon>
                <img
                  :src="photoUrl"
                  alt="photoImage"
                  v-if="photoUrl"
                  @click="changeIcon"
                />
              </v-avatar>
              <br />
            </td>
          </tr>
          <tr>
            <th>お名前：</th>
            <td>
              <input
                type="text"
                v-model="displayName"
                :placeholder="displayName"
              />
            </td>
          </tr>
          <tr>
            <th>メールアドレス：</th>
            <td>
              <input type="email" v-model="email" :placeholder="email" />
            </td>
          </tr>
          <tr>
            <th>パスワード：</th>
            <td>
              <v-btn text @click="sendResetPassword"
                >（パスワードを変更する）</v-btn
              >
            </td>
          </tr>
          <tr>
            <th>登録日：</th>
            <td>{{ createdAt | dayFormat }}</td>
          </tr>
          <tr>
            <th>更新日：</th>
            <td>{{ updatedAt | dayFormat }}</td>
          </tr>
          <tr>
            <th></th>
            <td><v-btn color="primary" @click="update">更新</v-btn></td>
          </tr>
          <tr>
            <th></th>
            <td><v-btn color="error" @click="logout">ログアウト</v-btn></td>
          </tr>
        </table>
      </div>
    </v-container>
  </div>
</template>

<script>
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import MyMixin from "@/mixins/my-mixin";

export default {
  mixins: [MyMixin],

  data() {
    return {
      userUid: "",
      photoUrl: "",
      displayName: "",
      email: "",
      password: "",
      createdAt: "",
      updatedAt: "",
      thumbnail: "",
    };
  },

  async mounted() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      await onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userUid = user.uid;
          this.photoUrl = user.photoURL;
          this.displayName = user.displayName;
          this.email = user.email;
          this.createdAt = user.metadata.creationTime;
          this.getUpdatedAt();
          console.log(user);
        } else {
          console.log("No user data.");
        }
      });
    } catch (e) {
      console.log("error: ", e);
      this.$nuxt.error({
        statusCode: 404,
        message: e,
        path: this.$route.fullPath,
      });
    }
  },

  methods: {
    update() {
      // const auth = getAuth(this.$firebase);
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: this.displayName,
      })
        .then(() => {
          console.log("displayName更新完了");
        })
        .catch((e) => {
          console.error("error: ", e);
        });

      updateEmail(auth.currentUser, this.email)
        .then(() => {
          console.log("email更新完了");
        })
        .catch((e) => {
          console.error("error: ", e);
        });

      this.updatedAtServerTimestamp();
    },

    // 「（パスワードを変更する）」テキストボタンをクリックでアラートを表示
    sendResetPassword() {
      const result = confirm("パスワードの再設定メールを送信します。");
      if (result) {
        const auth = getAuth(this.$firebase);
        sendPasswordResetEmail(auth, this.email)
          .then(() => {
            console.log(`パスワードの再設定を${this.email}へ送信しました。`);
          })
          .catch((e) => {
            console.error("error: ", e);
          });
      } else {
        console.log("キャンセルされました。");
      }
    },

    // update()のタイミングでfirestoreのupdatedAtを更新
    async updatedAtServerTimestamp() {
      const auth = getAuth(this.$firebase);
      const db = getFirestore(this.$firebase);
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        updatedAt: serverTimestamp(),
      });
    },

    // mountedで呼んで更新日をセットする
    async getUpdatedAt() {
      const auth = getAuth(this.$firebase);
      const db = getFirestore(this.$firebase);
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let timestamp = docSnap.data().updatedAt;
        this.updatedAt = timestamp ? timestamp.toDate() : null;
      } else {
        console.error("No such document!");
      }
    },

    downloadImage() {
      const storage = getStorage(this.$firebase);
      const imagesRef = ref(storage, "images");
      const spaceRef = ref(storage, "images/space.jpg");
      console.log(spaceRef.fullPath);
      console.log(spaceRef.name);
      console.log(spaceRef.bucket + "/" + spaceRef.fullPath);
    },

    // アイコンをクリックすることで画像を変更できる
    changeIcon() {
      this.$refs.fileInput.click();
    },
    updateIcon() {
      const auth = getAuth(this.$firebase);
      const user = auth.currentUser;

      // アップロードする画像を用意する
      const iconFile = this.$refs.fileInput.files[0];
      const filePath = `/user/${iconFile.name}`;
      console.log(iconFile);

      // storageへ画像をアップロードする
      const storage = getStorage(this.$firebase);
      const storageRef = ref(storage, filePath);
      uploadBytes(storageRef, iconFile).then(async (snapshot) => {
        console.log("Uploaded a blob or file.");

        // storageにアップロードした画像のURLを取得する
        const photoUrl = await getDownloadURL(ref(storage, filePath));
        console.log("photoUrl: ", photoUrl);

        // 取得したURLをユーザーのプロフィール情報にあるphotoUrlへ書き込む
        updateProfile(user, {
          photoURL: photoUrl,
        });

        this.photoUrl = photoUrl;
      });
    },

    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style scoped>
table {
  margin-top: 20px;
  margin-bottom: 20px;
}
td {
  padding: 15px 0;
}
th {
  text-align: right;
}
</style>

<template>
  <div class="flex justify-center">
    <v-card class="w-8/12 m-8 p-8">
      <h2>商品登録</h2>
      <v-row>
        <v-col class="text-center">
          <div class="flex justify-center">
            <input
              type="file"
              ref="fileInput"
              accept="image/jpeg, image/jpg, image/png"
              style="display: none"
              @change="updateThumbnail"
            />
            <img
              src="@/assets/product_default.gif"
              alt=""
              @click="changeThumbnail"
            />
          </div>
          <p class="text-sm">
            （上記の画像をクリックして任意の画像に変更できます）
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="商品名を入力" v-model="name"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="商品概要を入力"
            v-model="description"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="商品価格を円で入力"
            v-model="price"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="決済リンクURLを入力"
            v-model="paymentUrl"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-btn color="primary" @click="addData(name, description, price)"
            >登録</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  addDoc,
  Firestore,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      paymentUrl: "",
      thumbnailUrl: "",
      createdAt: "",
    };
  },
  methods: {
    async addData(name, description, price) {
      try {
        const db = getFirestore(this.$firebase);
        const docRef = await addDoc(collection(db, "products"), {
          name: this.name,
          description: this.description,
          price: this.price,
          paymentUrl: this.paymentUrl,
          thumbnailUrl: this.thumbnailUrl,
          createdAt: serverTimestamp(),
        });
        // 商品登録後、商品一覧画面に遷移
        this.$router.push("showData");
      } catch (e) {
        console.error("error: ", e);
      }
    },

    changeThumbnail() {
      this.$refs.fileInput.click();
    },
    updateThumbnail() {
      // アップロードする画像を用意する
      const thumbnailFile = this.$refs.fileInput.files[0];
      const filePath = `/products/${Date.now()}_${thumbnailFile.name}`;
      console.log(thumbnailFile);

      // storageへ画像をアップロードする
      const storage = getStorage(this.$firebase);
      const storageRef = ref(storage, filePath);
      uploadBytes(storageRef, thumbnailFile).then(async (snapshot) => {
        console.log("Uploaded a blob or file.");

        // storageにアップロードした画像のURLを取得する
        const thumbnailUrl = await getDownloadURL(ref(storage, filePath));
        this.thumbnailUrl = thumbnailUrl;
        console.log("thumbnailUrl: ", thumbnailUrl);
      });
    },
  },
};
</script>

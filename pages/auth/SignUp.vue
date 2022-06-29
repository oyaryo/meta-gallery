<template>
  <v-container fluid>
    <div class="register--box w-10/12 md:w-8/12">
      <v-card class="p-8">
        <v-card-title class="justify-center">ユーザー登録</v-card-title>
        <v-card-subtitle class="text-center"
          >ユーザー情報を入力してください。</v-card-subtitle
        >
        <div class="flex justify-center">
          <v-btn text color="light-blue" to="./login" class="text-xs"
            >ログインはこちら</v-btn
          >
        </div>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="displayName"
            label="表示名"
            :rules="nameRules"
            required
          />
          <v-text-field
            v-model="email"
            label="メールアドレス"
            :rules="emailRules"
            required
          />
          <v-text-field v-model="password" label="パスワード" required />
          <v-alert dense outlined type="error" v-if="this.errorMessage"
            >{{ errorMessage }}
          </v-alert>
          <v-btn color="success" @click="signUp" :disabled="isValid"
            >ユーザー登録</v-btn
          >
        </v-form>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

export default {
  layout() {
    return "before";
  },

  data() {
    return {
      displayName: "",
      nameRules: [
        (v) => !!v || "表示名の入力は必須です。",
        (v) => (v && v.length <= 10) || "10文字以内で入力してください。",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "メールアドレスは必須です。",
        (v) => /.+@.+\..+/.test(v) || "メールアドレスが不正です。",
      ],
      password: "",
      createdAt: "",
      updateAt: "",
      errorMessage: "",
      valid: false,
    };
  },
  computed: {
    isValid() {
      return !this.valid;
    },
  },
  methods: {
    async signUp() {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(async (userCredential) => {
          await updateProfile(userCredential.user, {
            displayName: this.displayName,
          });
          console.log(userCredential.user);
          console.log("ユーザー登録完了");

          const db = getFirestore();
          await setDoc(doc(db, "users", userCredential.user.uid), {
            // displayName: this.displayName,
            // email: this.email,
            // password: this.password,
            // createdAt: serverTimestamp(),
            updateAt: serverTimestamp(),
          });

          this.$router.push("./login");
        })
        .catch((e) => {
          console.log("error: ", e);
          this.errorMessage = "ユーザー登録に失敗しました。";
        });
    },
  },
};
</script>

<style scoped>
.register--box {
  margin: 0 auto;
}
</style>

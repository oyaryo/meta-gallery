<template>
  <v-container fluid>
    <div class="login--box w-10/12 md:w-8/12">
      <v-card class="p-8">
        <v-card-title class="justify-center">ログイン</v-card-title>
        <v-card-subtitle class="text-center"
          >ログイン情報を入力してください。</v-card-subtitle
        >
        <div class="flex justify-center">
          <v-btn text color="light-blue" to="./SignUp" class="text-xs"
            >新規ユーザー登録はこちら</v-btn
          >
        </div>

        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="メールアドレス"
            required
          ></v-text-field>

          <v-text-field v-model="password" type="password" label="パスワード" />
          <v-btn color="success" @click="login" :disabled="isValid"
            >ログイン</v-btn
          >
        </v-form>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: 'before',
  
  data() {
    return {
      email: "",
      emailRules: [
        (v) => !!v || "メールアドレスを入力してください。",
        (v) => /.+@.+\..+/.test(v) || "メールアドレスが不正です。",
      ],
      password: "",
      valid: false,
    };
  },
  computed: {
    isValid() {
      return !this.valid;
    },
  },
  methods: {
    login() {
      this.$store.dispatch("auth/login", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
.login--box {
  margin: 0 auto;
}
</style>

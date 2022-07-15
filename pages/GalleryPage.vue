<template>
  <div>
    <v-container>
      <div>
        <p class="mb-0 text-6xl md:text-9xl font-serif text-center">
          MY PRIVATE GALLERY
        </p>
        <p
          class="mt-0 text-lg md:text-xl tracking-wider p-2 font-serif text-center"
        >
          プライベートギャラリー
        </p>
      </div>
      <div class="text-center my-8">
        <p>ここから先は有料の特別展となります。<br />
        チケットをお持ちのお客様は、以下のENTERボタンからお入りください。</p>
        <v-btn color="primary" @click="pushEnter">ENTER</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  methods: {
    pushEnter(){
      this.$router.push("ContentPage");
    }
  }
}
</script>
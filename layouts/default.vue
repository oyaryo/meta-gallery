<template>
  <v-app>
    <HeaderView />
    <v-main
      class="bg-main-bg min-h-screen bg-cover bg-center bg-fixed object-cover"
    >
      <nuxt />
    </v-main>
    <v-footer>
      <FooterView />
    </v-footer>
  </v-app>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 1s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>

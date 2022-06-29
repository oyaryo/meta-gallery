<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-2xl font-extrabold text-gray-600"
        >Meta Gallery</v-toolbar-title
      >
      <div class="flex justify-end items-center">
        <v-avatar color="indigo">
          <v-icon dark v-if="!photoUrl" @click="toMypage">
            mdi-account-circle
          </v-icon>
          <img
            :src="photoUrl"
            alt="photoImage"
            v-if="photoUrl"
            @click="toMypage"
          />
        </v-avatar>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-for="(menuItem, index) in menuItems" :key="index">
            <nuxt-link :to="menuItem.url">
              <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
            </nuxt-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import constants from "./common/constants";

export default {
  async mounted() {
    const auth = getAuth();
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        this.photoUrl = user.photoURL;
      } else {
        console.log("No such data.");
      }
    });
  },
  data() {
    return {
      photoUrl: "",
      drawer: false,
      menuItems: constants.menuItems,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/getLoggedIn"];
    },
  },
  methods: {
    toMypage() {
      this.$router.push("/mypage");
    },
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style scoped>
a:link {
  color: #475569;
}
a:visited {
  color: #475569;
}
</style>

<template>
  <div class="flex justify-between items-center">
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-2xl font-extrabold text-gray-600">Private Gallery</v-toolbar-title>
    <nav class="hidden md:inline-block">
      <ul class="flex justify-end items-center">
        <li class="gnav--item"><nuxt-link to="/">ホーム</nuxt-link></li>
        <li class="gnav--item">
          <nuxt-link to="NewsPage">お知らせ</nuxt-link>
        </li>
        <li class="gnav--item">
          <nuxt-link to="GalleryPage">ギャラリー</nuxt-link>
        </li>
        <li class="gnav--item">
          <nuxt-link to="ShopPage">ショップ</nuxt-link>
        </li>
        <li class="gnav--item" @click="logout">
          <nuxt-link to="">ログアウト</nuxt-link>
        </li>
        <li>
          <div>
            <v-avatar color="indigo">
              <v-icon dark v-if="!photoUrl" @click="openDrawerMenu">
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
        </li>
      </ul>
    </nav>
    <div class="md:hidden">
      <v-avatar color="indigo">
        <v-icon dark v-if="!photoUrl" @click="openDrawerMenu">
          mdi-account-circle
        </v-icon>
        <img
          :src="photoUrl"
          alt="photoImage"
          v-if="photoUrl"
          @click="openDrawerMenu"
        />
      </v-avatar>
    </div>
    <transition name="right">
      <div v-if="drawerFlg" class="drawer-menu-wrapper">
        <div class="drawer-menu">
          <ul>
            <li class="gnav--item border-b">
              <nuxt-link
                to="/"
                class="block px-8 py-2 hover:bg-gray-300 rounded"
                >ホーム</nuxt-link
              >
            </li>
            <li class="gnav--item border-b">
              <nuxt-link
                to="NewsPage"
                class="block px-8 py-2 hover:bg-gray-300 rounded"
                >お知らせ</nuxt-link
              >
            </li>
            <li class="gnav--item border-b">
              <nuxt-link
                to="GalleryPage"
                class="block px-8 py-2 hover:bg-gray-300 rounded"
                >ギャラリー</nuxt-link
              >
            </li>
            <li class="gnav--item border-b">
              <nuxt-link
                to="ShopPage"
                class="block px-8 py-2 hover:bg-gray-300 rounded"
                >ショップ</nuxt-link
              >
            </li>
            <li
              class="gnav--item border-b block px-8 py-2 hover:bg-gray-300 rounded"
            >
              <nuxt-link to="MyPage">マイページ</nuxt-link>
            </li>
            <li
              class="gnav--item block px-8 py-2 hover:bg-gray-300 rounded"
              @click="logout"
            >
              <nuxt-link to="">ログアウト</nuxt-link>
            </li>
            <li></li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
      drawerFlg: false,
      drawer: false,
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
    openDrawerMenu() {
      this.drawerFlg = !this.drawerFlg;
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

.gnav--item:not(:last-child) {
  margin-right: 20px;
  text-align: right;
}

.right-enter-active,
.right-leave-active {
  transform: translate(0px, 0px);
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}
.right-enter,
.right-leave-to {
  transform: translateX(100vw) translateX(0px);
}

.drawer-menu-wrapper {
  position: absolute;
  z-index: 10;
  top: 55px;
  right: 0;
  /* left: 0 //左に出す場合 */
  width: 50%;
  /* height: 100%; */
  height: 320px;
  background-color: #f5f5f5;
}
.drawer-menu {
  padding: 24px;
}
</style>

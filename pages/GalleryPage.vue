<template>
  <div>
    <v-container>
      <div class="flex">
        <div class="w-3/12 h-24 bg-meta-gallery-100"></div>
        <div class="w-3/12 h-24 bg-meta-gallery-200"></div>
        <div class="w-3/12 h-24 bg-meta-gallery-300"></div>
        <div class="w-3/12 h-24 bg-meta-gallery-400"></div>
      </div>
      <div class="text-center my-8">
        <v-btn color="primary" class="" @click="checkTicket">ENTER</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      hasTicket: false,
      email: "",
    };
  },
  mounted() {
    const auth = getAuth();
    const user = auth.currentUser;
    this.email = user.email;
  },
  methods: {
    async checkTicket() {
      console.log("checkTicket call");

      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "tickets"));
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().email);
        if (doc.data().email === this.email) {
          // console.log(doc.data());
          this.$router.push("ContentPage");
        } else {
          // console.log("No such document!");
          this.$router.push("ShopPage");
        }
      });
    },
  },
};
</script>

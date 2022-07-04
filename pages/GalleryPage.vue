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

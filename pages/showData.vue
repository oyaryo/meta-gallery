<template>
  <div class="flex justify-center">
    <v-card class="w-8/12 m-8 p-8">
      <div class="flex justify-center">
        <v-card-title>商品一覧</v-card-title>
      </div>
      <div v-for="product in products" :key="product.id">
        商品名: {{ product.name }}<br />
        概要： {{ product.description }}<br />
        価格：{{ product.price }}
        <div class="text-right">
          <v-btn color="error" @click="remove(product.id)">削除</v-btn>
        </div>
        <hr />
      </div>
    </v-card>
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
// import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default {
  data() {
    return {
      products: [],
    };
  },
  async created() {
    try {
      const db = getFirestore(this.$firebase);
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.products.push({
          id: doc.id,
          name: data.name,
          description: data.description,
          price: data.price,
        });
      });
    } catch (e) {
      console.error("error: ", e);
    }
  },
  methods: {
    async remove(id) {
      const db = getFirestore(this.$firebase);
      await deleteDoc(doc(db, "products", id))
      .then((result) => {
        console.log("削除完了");
        location.reload();
      })
      .catch((e) => {
        console.error('error: ', e);
      });
    },
  },
};
</script>

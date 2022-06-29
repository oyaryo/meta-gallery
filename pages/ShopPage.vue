<template>
  <div>
    <v-container>
      <div>
        <p class="mb-0 text-6xl md:text-9xl font-serif text-center">
          ONLINE SHOP
        </p>
        <p
          class="mt-0 text-lg md:text-xl tracking-wider p-2 font-serif text-center"
        >
          オンラインショップ
        </p>
      </div>
    </v-container>

    <v-container>
      <v-row>
        <v-col v-for="product in products" :key="product.id">
          <v-card class="mx-auto" max-width="250">
            <v-img
              v-if="product.thumbnailUrl"
              :src="product.thumbnailUrl"
            ></v-img>
            <v-img
              v-if="!product.thumbnailUrl"
              src="https://firebasestorage.googleapis.com/v0/b/fir-pj3-26803.appspot.com/o/material%2F18866491_MotionElements_new-product-realistic_converted_510030-480x270-3s-q2.gif?alt=media&token=d7c930b9-03b6-4cde-b18c-40c2e00ce18c"
              alt=""
            ></v-img>

            <v-card-title> {{ product.name }} </v-card-title>

            <v-card-subtitle> {{ product.description }} </v-card-subtitle>

            <p class="text-right mx-8">¥{{ product.price }}-.</p>

            <div class="flex justify-center">
              <a :href="product.paymentUrl" target="_blank"><v-btn color="success" class="m-4">購入</v-btn></a>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      products: [],
    };
  },

  async mounted() {
    try {
      const db = getFirestore(this.$firebase);
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        this.products.push(doc.data());
      });
    } catch (e) {
      console.error("error: ", e);
    }
  },
};
</script>

<style scoped>
.key-visual {
  position: relative;
}

.key-visual img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.title-text {
  position: absolute;
  color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

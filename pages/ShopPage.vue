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
          </v-card>
        </v-col>
      </v-row>
      <div class="flex justify-center">
              <stripe-checkout
                ref="checkoutRef"
                mode="payment"
                :pk="publishableKey"
                :customerEmail="email"
                :line-items="lineItems"
                :success-url="successURL"
                :cancel-url="cancelURL"
                @loading="(v) => (loading = v)"
              />
              <v-btn color="success" class="m-4" @click="submit">購入</v-btn>
            </div>
    </v-container>
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default {
  components: {
    StripeCheckout,
  },
  data() {
    // this.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    // this.publishableKey =
    //   "pk_live_51LDPHXAQC2RXpTXkKmUQwDPzqlZhyyFZg8JLj7HQGdP0JuDpv4gGl4ooqp2SXIz0SIFkZg0zqJvF5qrDOo0KN0NN00gKVw9eAM";
    this.publishableKey = functions.config().stripe.apikey;
    return {
      products: [],
      loading: false,
      lineItems: [
        {
          price: "price_1LGFOsAQC2RXpTXkrv3rIbEf", // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: "https://meta-gallary.web.app/success",
      cancelURL: "https://meta-gallary.web.app/cancel",
      email: "",
    };
  },

  async mounted() {
    try {
      const db = getFirestore(this.$firebase);
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        this.products.push(doc.data());
      });

      // Stripeへ渡すログインユーザーのメールアドレス情報を取得
      const auth = getAuth();
      const user = auth.currentUser;
      this.email = user.email;
    } catch (e) {
      console.error("error: ", e);
    }
  },
  methods: {
    submit() {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
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

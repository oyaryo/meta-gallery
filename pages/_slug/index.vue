<template>
  <div>
    <v-container>
      <h1 class="text-2xl font-bold p-4">{{ data.title }}</h1>
      <p class="p-4">{{ data.publishedAt | dayFormat }}</p>
      <div class="p-4" v-html="data.content"></div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import MyMixin from "@/mixins/my-mixin";

export default {
  mixins: [MyMixin],

  async asyncData({ params }) {
    const data = await axios.get(
      `https://conditionyellow.microcms.io/api/v1/news/${params.slug}`,
      {
        headers: {
          "X-MICROCMS-API-KEY": "1834e7af205d486994be3447af91fbac50b0",
        },
      }
    );
    return data;
  },
};
</script>

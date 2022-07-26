<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4"
          ><p class="font-serif text-7xl">NEWS</p>
          <p class="font-serif font-light">更新情報</p></v-col
        >
        <v-col cols="8">
          <h1 class="font-bold text-3xl my-4">{{ data.title }}</h1>
          <p class="text-sm font-light my-2">
            {{ data.publishedAt | dayFormat }}
          </p>
          <div class="font-serif leading-relaxed" v-html="data.content"></div
        ></v-col>
      </v-row>
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

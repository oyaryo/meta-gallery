<template>
  <div>
    <v-container>
      <div>
        <p class="mb-0 text-6xl md:text-9xl font-serif">INFORMATION</p>
        <p class="mt-0 text-lg md:text-2xl tracking-wider p-2 font-serif">最新情報</p>
      </div>
    </v-container>

    <v-container>
      <div class="my-16">
        <hr class="border border-1 border-dotted border-gray-300">
        <div class="flex" v-for="content in contents" :key="content.id">
          <div class="w-4/12"></div>
          <div class="w-8/12 p-4 bg-gray-100 news-border">
            <p class="font-sans text-xs">DATE {{ content.publishedAt | dayFormat }}</p>
            <p class=""><nuxt-link :to="`/${content.id}`">{{ content.title }}</nuxt-link></p>
            <p class="font-serif truncate">
              {{ content.overview }}
            </p>
          </div>
        </div>
          <hr class="border border-1 border-dotted border-gray-300"/>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import MyMixin from '@/mixins/my-mixin';

export default {
  mixins: [MyMixin],

  async asyncData() {
    const { data } = await axios.get(
      "https://conditionyellow.microcms.io/api/v1/news",
      {
        headers: {
          "X-MICROCMS-API-KEY": "1834e7af205d486994be3447af91fbac50b0",
        },
      }
    );
    return data;
  },
}
</script>

<style scoped>
a:link {
  color: #1f2937;
}
a:visited {
  color: #64748b
}

.news-border {
  border: 1px dotted #cbd5e0;
  border-top: none;
}
.news-border:last-of-type {
  border: 1px dotted #cbd5e0;
  border-bottom: none;
}
</style>

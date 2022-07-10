<template>
  <div>
    <v-container>
      <p class="mb-0 text-6xl md:text-9xl font-serif text-center">
        {{ error.statusCode }}
      </p>
      <div
        class="mt-2 text-lg md:text-xl tracking-wider p-2 font-serif text-center"
      >
        エラーページです。
      </div>
      <p class="mt-0 text-sm p-4 font-serif text-center">{{ error.message }}</p>
      <p class="mt-0 text-sm p-4 font-serif text-center">{{ error.path }}</p>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["error"],
};
</script>

<template>
  <div>
    <v-container>
      <v-layout column justify-center align-center>
        <v-row style="margin-bottom: 20px">
          <v-col>
            <Unity :unity="unityContext" width="960px" height="600px" />
          </v-col>
        </v-row>
      </v-layout>
    </v-container>
    <script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-firestore.js"></script>
  </div>
</template>

<script>
import UnityWebgl from "unity-webgl";

const Unity = new UnityWebgl({
  loaderUrl: "/Build/Demo.loader.js",
  dataUrl: "/Build/Demo.data",
  frameworkUrl: "/Build/Demo.framework.js",
  codeUrl: "/Build/Demo.wasm",
});

export default {
  name: "ContentPage",
  components: {
    Unity: UnityWebgl.vueComponent,
  },

  middleware: "checkTicket",

  head() {
    return {
      script: [{ src: "/head.js" }],
      script: [{ src: "/body.js", body: true }],
    };
  },

  data() {
    return {
      unityContext: Unity,
      loading: true,
    };
  },
};
</script>

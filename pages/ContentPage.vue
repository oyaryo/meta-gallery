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
  
  data() {
    return {
      unityContext: Unity,
      loading: true,
    };
  },
};
</script>

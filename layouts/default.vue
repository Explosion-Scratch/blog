<template>
  <div id="container" class="dark">
    <AppHeader />
    <Nuxt />
  </div>
</template>
<script>
import { dark } from "../static/css/base.scss";
import twemoji from "twemoji";

export default {
  created() {
    if (process.browser) {
      if (dark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light-mode");
      }
      console.log(twemoji);
      twemoji.size = "72x72";
      window.onNuxtReady(() => {
        twemoji.parse(document.body);
      });
    }
  },
};
</script>
<style>
img.emoji {
  height: 1em !important;
  width: 1em !important;
  margin: 0 0.05em 0 0.1em !important;
  vertical-align: -0.1em !important;
  display: inline !important;
}
</style>

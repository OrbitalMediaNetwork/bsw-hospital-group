<template>
  <footer class="footer is-flex is-justify-content-center is-align-center mt-4">
    <div class="mr-3 fw-600">
      Powered by 
      <a href="https://orbitalmedia.com/scoop" target="_blank" class="footer__text-link">Scoop</a> 
      by 
    </div>
    <a href="https://orbitalmedia.com/scoop" target="_blank">
      <img 
        v-if="videoStore.isDarkMode" 
        src="/images/WHITE-HORIZONTAL.png" 
        alt="Orbital Media" 
        width="129" 
        height="26" 
      />
      <img 
        v-else 
        src="/images/BLACK-HORIZONTAL.png" 
        alt="Orbital Media" 
        width="129" 
        height="26" 
      />
    </a>
  </footer>
</template>

<script>
import { useVideoStore } from "../stores/videos";
import { mapStores } from "pinia";

export default {
  name: "AppFooter",

  computed: {
    ...mapStores(useVideoStore),
  },
};
</script>

<style scoped>
.footer__text-link {
  text-decoration: none;
  color: inherit;
}

.footer__text-link:hover {
  text-decoration: underline;
}
</style>
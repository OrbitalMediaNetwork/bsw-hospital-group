<template>
  <footer class="app-footer is-flex is-justify-content-center is-align-center mt-4">
    <div class="mr-3 footer__text">
      Powered by 
      <a href="https://orbitalmedia.com/scoop" target="_blank" class="footer__text-link">Scoop</a> 
      by 
    </div>
    <a href="https://orbitalmedia.com/scoop" target="_blank" class="footer__logo-link">
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
.app-footer {
  padding: 1.25rem;
  margin-top: 3rem;
  font-size: 0.875rem;
  transition: all 300ms ease;
}

.footer__text {
  color: #64748b;
}

.isDark .app-footer {
  color: #cbd5e1;
}

.footer__text-link {
  text-decoration: none;
  color: #6366f1;
  font-weight: 600;
  transition: opacity 200ms ease;
}

.footer__text-link:hover {
  opacity: 0.8;
}

.footer__logo-link {
  display: block;
  transition: transform 250ms ease;
}

.footer__logo-link:hover {
  transform: scale(1.05);
}
</style>
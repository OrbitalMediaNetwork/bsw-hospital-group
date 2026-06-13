<template>
  <div class="page-wrapper">
    <div>
      <h1 class="page-title page-title--small">Select the Experience</h1>

      <div v-if="videoStore.experiences.length > 0">
        <ExperienceMenu />
      </div>
      <div v-else class="no-experiences-message">
        <p>No experiences available for this organisation.</p>
        <p>Please contact your administrator or select a different organisation.</p>
      </div>

      <NavigationButtons :previous-route="{ path: '/instructions', label: 'Back to Instructions' }" />
    </div>
  </div>
  <AppFooter />
</template>

<script>
import ExperienceMenu from "../components/ExperienceMenu.vue";
import AppFooter from "../components/AppFooter.vue";
import NavigationButtons from "../components/NavigationButtons.vue";
import { useVideoStore } from "../stores/videos";
import { mapStores } from "pinia";

export default {
  name: "HomeView",

  components: {
    ExperienceMenu,
    AppFooter,
    NavigationButtons,
  },

  computed: {
    ...mapStores(useVideoStore),
  },
};
</script>

<style scoped>
.no-experiences-message {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.no-experiences-message p {
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
}
</style>
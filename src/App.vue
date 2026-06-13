<template>
  <div :class="{ isDark: videoStore.isDarkMode }" class="app-container">
    <div class="is-flex is-align-items-center">
      <img
        v-if="selectedClientLogo"
        class="my-2"
        :src="selectedClientLogo"
        :alt="selectedClient ? selectedClient.name + ' Logo' : 'Client Logo'"
        width="140"
        height="41"
      >
      <img
        v-else
        class="my-2"
        src="https://bsw-videos-447184491365-eu-west-2-an.s3.eu-west-2.amazonaws.com/BSW+Hospitals+Group_Stacked+Logo_CMYK_150dpi.jpg"
        alt="Default Client Logo"
        width="140"
        height="41"
      >
    </div>
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { experiences } from "./stores/experiences";
import { mapStores } from "pinia";
import { useVideoStore } from "./stores/videos";

export default {
  data() {
    return {
      experiences,
      selectedVideoSrc: null,
    };
  },
  computed: {
    ...mapStores(useVideoStore),
    selectedClientLogo() {
      return this.selectedClient && this.selectedClient.logo ? this.selectedClient.logo : null;
    },
  },
};
</script>

<template>
  <div :class="{ isDark: videoStore.isDarkMode }" class="app-container">
    <header class="app-header">
      <img
        v-if="selectedClientLogo"
        class="header-logo"
        :src="selectedClientLogo"
        :alt="selectedClient ? selectedClient.name + ' Logo' : 'Client Logo'"
        width="160"
        height="50"
      >
      <img
        v-else
        class="header-logo"
        src="https://bsw-videos-447184491365-eu-west-2-an.s3.eu-west-2.amazonaws.com/BSW+Hospitals+Group_Stacked+Logo_CMYK_150dpi.jpg"
        alt="Default Client Logo"
        width="160"
        height="50"
      >
    </header>
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useVideoStore } from "./stores/videos";

export default {
  computed: {
    ...mapStores(useVideoStore),
    selectedClientLogo() {
      return this.selectedClient && this.selectedClient.logo ? this.selectedClient.logo : null;
    },
  },
};
</script>

<style>
.app-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.header-logo {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.app-header:hover .header-logo {
  transform: scale(1.05);
}
</style>

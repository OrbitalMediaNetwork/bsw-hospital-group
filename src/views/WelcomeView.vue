<template>
  <div class="page-wrapper">
    <div>
      <h1 class="welcome-title">Select Your Organisation</h1>
      
      <div class="client-selection">
        <div
          v-for="client in clients"
          :key="client.id"
          :class="['client-card', { 'client-card--selected': selectedClient && selectedClient.id === client.id }]"
          @click="selectClient(client)"
        >
          <img :src="client.logo" :alt="client.name" class="client-logo" />
          <h2 class="client-name">{{ client.name }}</h2>
        </div>
      </div>

      <NavigationButtons 
        :next-route="{ path: '/instructions', label: 'Next' }" 
        :disabled="!selectedClient"
      />
    </div>
  </div>
  <AppFooter />
</template>

<script>
import { useVideoStore } from "../stores/videos";
import { clients } from "../stores/clients";
import AppFooter from "../components/AppFooter.vue";
import NavigationButtons from "../components/NavigationButtons.vue";

export default {
  name: "WelcomeView",

  components: {
    AppFooter,
    NavigationButtons,
  },

  data() {
    return {
      clients: clients,
      selectedClient: null,
    };
  },

  methods: {
    selectClient(client) {
      this.selectedClient = client;
      // Store the selected client in the video store
      const videoStore = useVideoStore();
      videoStore.setSelectedClient(client);
    },
  },
};
</script>

<style scoped>
.client-card--selected {
  border: 3px solid #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  transform: translateY(-3px);
}

.client-card--selected:hover {
  transform: translateY(-3px);
}
</style>
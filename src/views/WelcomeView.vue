<template>
  <div class="page-wrapper">
    <div class="welcome-content">
      <h1 class="welcome-title">Welcome to EDI Training</h1>
      <p class="page-subtitle">Equity, Diversity & Inclusion learning modules for professional development</p>

      <Transition name="fade-slide" mode="out-in">
        <div v-if="routeMessage" class="route-message">
          {{ routeMessage }}
        </div>
      </Transition>

      <div class="client-selection">
        <TransitionGroup name="stagger" tag="div" 
            v-for="client in clients"
            :key="client.id"
            :class="['client-card', { 'client-card--selected': selectedClient && selectedClient.id === client.id }]"
            @click="selectClient(client)"
          >
            <img :src="client.logo" :alt="client.name" class="client-logo" />
            <h2 class="client-name">{{ client.name }}</h2>
            <p v-if="client.description" class="client-description">{{ client.description }}</p>
          
        </TransitionGroup>
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

  computed: {
    routeMessage() {
      return this.$route.query.message || "";
    },
  },

  methods: {
    selectClient(client) {
      this.selectedClient = client;
      if (this.$route.query.message) {
        this.$router.replace({ path: '/', query: {} });
      }
      const videoStore = useVideoStore();
      videoStore.setSelectedClient(client);
    },
  },
};
</script>

<style scoped>
.welcome-content {
  text-align: center;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 250ms ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.stagger-move {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stagger-enter-active,
.stagger-leave-active {
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.stagger-enter-from,
.stagger-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}
</style>
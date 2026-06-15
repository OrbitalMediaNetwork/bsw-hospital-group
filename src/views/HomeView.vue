<template>
  <div class="page-wrapper">
    <div class="home-content">
      <h1 class="page-title page-title--small">Select the Experience</h1>
      <p class="page-subtitle">Choose from the available training modules below</p>

      <div class="experience-info">
        <p class="experience-intro">Each interactive module helps you develop practical skills through real-world scenarios.</p>
        <ul class="experience-features">
          <li><span class="feature-bullet">•</span> Interactive video scenarios with decision points</li>
          <li><span class="feature-bullet">•</span> Knowledge checks to reinforce learning</li>
          <li><span class="feature-bullet">•</span> Self-paced learning - complete anytime</li>
        </ul>
      </div>

      <Transition name="fade" mode="out-in">
        <div v-if="videoStore.experiences.length > 0" key="experiences">
          <ExperienceMenu />
        </div>
        <div v-else class="no-experiences-message" key="no-experiences">
          <p>No experiences available for this organisation.</p>
          <p>Please contact your administrator or select a different organisation.</p>
        </div>
      </Transition>

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
.home-content {
  text-align: center;
}

.page-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.experience-info {
  max-width: 500px;
  margin: 0 auto 2rem;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.3);
}

.isDark .experience-info {
  background: rgba(51, 65, 85, 0.3);
  border-color: rgba(100, 116, 139, 0.2);
}

.experience-intro {
  font-size: 0.95rem;
  color: #475569;
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.isDark .experience-intro {
  color: #cbd5e1;
}

.experience-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;
  font-size: 0.875rem;
}

.experience-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  padding: 0.25rem 0;
}

.isDark .experience-features li {
  color: #94a3b8;
}

.feature-bullet {
  color: #6366f1;
  font-weight: 600;
}

.isDark .feature-bullet {
  color: #818cf8;
}

.no-experiences-message {
  text-align: center;
  padding: 3rem;
  color: #64748b;
  animation: fadeIn 300ms ease;
}

.no-experiences-message p {
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  opacity: 0.8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms ease, transform 250ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
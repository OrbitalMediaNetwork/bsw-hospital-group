<template>
  <div class="page-wrapper">
    <div class="page-content text-center">
      <h1 class="page-title">Module Completed</h1>
      <p class="completed-subtitle">You have completed the module:</p>
      <h2 class="completed-module-title">{{ completedModuleTitle }}</h2>

      <p class="completed-intro">Other available modules for your organisation:</p>

      <div class="modules-list">
        <RouterLink
          v-for="module in availableModules"
          :key="module.slug"
          :to="{ name: 'experience', params: { slug: module.slug } }"
          class="module-card"
        >
          <h3 class="module-name">{{ module.title }}</h3>
          <p v-if="module.description" class="module-description">{{ module.description }}</p>
        </RouterLink>
      </div>

      <NavigationButtons :next-route="{ path: '/experiences', label: 'Back to All Experiences' }" />
    </div>
  </div>
  <AppFooter />
</template>

<script>
import AppFooter from "../components/AppFooter.vue";
import NavigationButtons from "../components/NavigationButtons.vue";
import { useVideoStore } from "../stores/videos";
import { mapStores } from "pinia";

export default {
  name: "CompletedView",

  components: {
    AppFooter,
    NavigationButtons,
  },

  computed: {
    ...mapStores(useVideoStore),

    completedModuleTitle() {
      const slug = this.$route.params.slug;
      const experience = this.videoStore.experiences.find((exp) => exp.slug === slug);
      return experience ? experience.title : "Unknown Module";
    },

    availableModules() {
      const slug = this.$route.params.slug;
      return this.videoStore.experiences.filter((exp) => exp.slug !== slug);
    },
  },
};
</script>

<style scoped>
.page-content {
  max-width: 800px;
  margin: 0 auto;
}

.completed-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.completed-module-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 2rem;

  .isDark & {
    color: #e2e8f0;
  }
}

.completed-intro {
  font-size: 1rem;
  color: #475569;
  margin-bottom: 1.5rem;
  font-weight: 500;

  .isDark & {
    color: #94a3b8;
  }
}

.modules-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.module-card {
  display: block;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.5);
  text-align: left;
  text-decoration: none;
  transition: all 200ms ease;
  backdrop-filter: blur(10px);
  cursor: pointer;

  &:hover {
    background: rgba(99, 102, 241, 0.06);
    border-color: rgba(99, 102, 241, 0.3);
    transform: translateX(4px);
  }
}

.isDark .module-card {
  background: rgba(51, 65, 85, 0.5);
  border-color: rgba(100, 116, 139, 0.3);

  &:hover {
    background: rgba(129, 140, 248, 0.08);
    border-color: rgba(129, 140, 248, 0.3);
  }
}

.module-name {
  font-size: 1.05rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;

  .isDark & {
    color: #e2e8f0;
  }
}

.module-description {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.25rem 0 0;

  .isDark & {
    color: #94a3b8;
  }
}
</style>

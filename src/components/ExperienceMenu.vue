<template>
  <div class="experience-menu__grid">
    <TransitionGroup name="experience-stagger" tag="div" 
        v-for="item in videoStore.experiences"
        :key="item.slug"
        @click.prevent="handleSelectExperience(item)"
        class="experience__button"
        :class="{ 'experience__button--disabled': !item.videos || item.videos.length === 0 }"
      >
        <img class="experience__img" :src="item.thumbURL" :alt="item.title" />
        <p class="experience__title">{{ item.title }}</p>
        <p v-if="item.description" class="experience__description">{{ item.description }}</p>
        <p v-if="!item.videos || item.videos.length === 0" class="experience__coming-soon">Coming soon</p>
      </TransitionGroup>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useVideoStore } from "../stores/videos";

export default {
  name: "ExperienceMenu",

  computed: {
    ...mapStores(useVideoStore),
  },

  methods: {
    handleSelectExperience(exp) {
      if (!exp.videos || exp.videos.length === 0) return;
      const client = this.videoStore.selectedClient ? this.videoStore.selectedClient.id : undefined;
      this.$router.push({ name: "experience", params: { slug: exp.slug, client } });
    },
  },
};
</script>

<style>
.experience__description {
  font-size: 0.875rem;
  color: #64748b;
  padding: 0 1rem 1rem;
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
}

.isDark .experience__description {
  color: #cbd5e1;
}

.experience__coming-soon {
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 500;
  padding: 0 1rem 1rem;
  margin: 0;
  font-style: italic;
}

.isDark .experience__coming-soon {
  color: #64748b;
}

.experience__button--disabled {
  opacity: 0.7;
  cursor: not-allowed;
  pointer-events: none;
}

.experience-stagger-move {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.experience-stagger-enter-active,
.experience-stagger-leave-active {
  transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.experience-stagger-enter-from,
.experience-stagger-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
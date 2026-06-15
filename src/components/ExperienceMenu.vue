<template>
  <div class="experience-menu__grid">
    <TransitionGroup name="experience-stagger" tag="div" 
        v-for="item in videoStore.experiences"
        :key="item.slug"
        @click.prevent="handleSelectExperience(item)"
        class="experience__button"
      >
        <img class="experience__img" :src="item.thumbURL" :alt="item.title" />
        <p class="experience__title">{{ item.title }}</p>
        <p v-if="item.description" class="experience__description">{{ item.description }}</p>
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
      this.$router.push({ name: "experience", params: { slug: exp.slug } });
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
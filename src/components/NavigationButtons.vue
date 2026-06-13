<template>
  <div class="navigation-buttons" :class="{ disabled: isDisabled }">
    <router-link 
      v-if="previousRoute" 
      :to="previousRoute.path" 
      class="btn btn-prev"
    >
      {{ previousRoute.label }}
    </router-link>
    <router-link 
      v-if="nextRoute" 
      :to="nextRoute.path" 
      :class="['btn', 'btn-next', { 'start-experience': isStartExperience }]"
    >
      {{ nextRoute.label }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavigationButtons",

  props: {
    previousRoute: {
      type: Object,
      default: null,
      validator: (value) => {
        return !value || (value.path && value.label);
      }
    },
    nextRoute: {
      type: Object,
      default: null,
      validator: (value) => {
        return !value || (value.path && value.label);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isStartExperience() {
      return this.nextRoute && this.nextRoute.label.includes('Start');
    },
    isDisabled() {
      return this.disabled;
    }
  }
};
</script>

<style scoped>
.navigation-buttons {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  gap: 1rem;
}

.navigation-buttons.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-prev {
  background-color: #6c757d;
  color: white;
}

.btn-prev:hover {
  background-color: #545b62;
  color: white;
}

.btn-next {
  background-color: #007bff;
  color: white;
}

.btn-next:hover {
  background-color: #0056b3;
  color: white;
}

/* Special variant for "Start Experience" button */
.btn-next.start-experience {
  background-color: #28a745;
}

.btn-next.start-experience:hover {
  background-color: #1e7e34;
}
</style>
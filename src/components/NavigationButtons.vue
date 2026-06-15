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
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 14px;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  color: white;
  border: 0;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #818cf8, #6366f1);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

.btn-prev {
  background-color: #64748b;
}

.btn-prev:hover {
  background-color: #475569;
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.btn-next {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
}

.btn-next:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.btn-next.start-experience {
  background: linear-gradient(135deg, #10b981, #059669);
}

.btn-next.start-experience:hover {
  background: linear-gradient(135deg, #059669, #10b981);
  filter: brightness(1.05);
}
</style>
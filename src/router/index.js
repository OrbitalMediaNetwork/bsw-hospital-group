import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import InstructionsView from '../views/InstructionsView.vue'
import HomeView from '../views/HomeView.vue'
import VideoView from '../views/VideoView.vue'
import CompletedView from '../views/CompletedView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { useVideoStore } from '../stores/videos'

const validateExperienceRoute = (to) => {
  const videoStore = useVideoStore()
  const slug = to.params.slug

  if (!videoStore.selectedClient) {
    return {
      path: '/',
      query: {
        message: 'Please select the organisation first.'
      }
    }
  }

  const experience = videoStore.experiences.find((i) => i.slug === slug)

  if (!experience) {
    return {
      path: '/',
      query: {
        message: 'That experience is not available for this organisation.'
      }
    }
  }

  return true
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/instructions',
      name: 'instructions',
      component: InstructionsView
    },
    {
      path: '/experiences',
      name: 'experiences',
      component: HomeView
    },
    {
      path: '/experience/:slug',
      name: 'experience',
      component: VideoView,
      beforeEnter: validateExperienceRoute
    },
    {
      path: '/completed/:slug',
      name: 'completed',
      component: CompletedView,
      beforeEnter: validateExperienceRoute
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView,
    }
  ]
})

export default router

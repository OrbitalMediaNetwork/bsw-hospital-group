import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import InstructionsView from '../views/InstructionsView.vue'
import HomeView from '../views/HomeView.vue'
import VideoView from '../views/VideoView.vue'
import CompletedView from '../views/CompletedView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { useVideoStore } from '../stores/videos'
import { clients } from '../stores/clients'

const getClientFromParams = (params) => {
  if (!params.client) return null
  return clients.find((c) => c.id === params.client) || null
}

const validateClientRoute = (to) => {
  const videoStore = useVideoStore()
  const client = getClientFromParams(to.params)

  if (!client) {
    return {
      path: '/',
      query: {
        message: 'Please select the organisation first.'
      }
    }
  }

  videoStore.setSelectedClient(client)
  return true
}

const validateExperienceRoute = (to) => {
  const result = validateClientRoute(to)
  if (result !== true) return result

  const videoStore = useVideoStore()
  const slug = to.params.slug

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

const restoreClientFromRoute = (to) => {
  const client = getClientFromParams(to.params)
  if (client) {
    useVideoStore().setSelectedClient(client)
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:client?',
      name: 'welcome',
      component: WelcomeView,
      beforeEnter: restoreClientFromRoute
    },
    {
      path: '/:client?/instructions',
      name: 'instructions',
      component: InstructionsView,
      beforeEnter: validateClientRoute
    },
    {
      path: '/:client?/experiences',
      name: 'experiences',
      component: HomeView,
      beforeEnter: validateClientRoute
    },
    {
      path: '/:client?/experience/:slug',
      name: 'experience',
      component: VideoView,
      beforeEnter: validateExperienceRoute
    },
    {
      path: '/:client?/completed/:slug',
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

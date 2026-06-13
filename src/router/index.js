import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import InstructionsView from '../views/InstructionsView.vue'
import HomeView from '../views/HomeView.vue'
import VideoView from '../views/VideoView.vue'
import NotFoundView from '../views/NotFoundView.vue'

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
      component: VideoView
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFoundView,
    }
  ]
})

export default router

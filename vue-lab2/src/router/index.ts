import { createRouter, createWebHistory } from 'vue-router'
import { ROOT_ROUTES } from '@/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROOT_ROUTES.HOME,
      name: 'Home',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: () => import('../views/HomeView.vue')
    },
    {
      path: ROOT_ROUTES.HOME,
      component: () => import('../layouts/DefaultLayout.vue'),
      children: () => import('../views/HomeView.vue')
    }
  ]
})

export default router

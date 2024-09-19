import { createWebHistory, createRouter } from 'vue-router'
import { ROOT_ROUTE_NAMES, ROOT_ROUTE_PATHS } from '@/utils'
import { authMiddleware } from '@/middleware/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROOT_ROUTE_PATHS.LOGIN,
      name: ROOT_ROUTE_NAMES.LOGIN,
      component: () => import('../views/LoginView.vue')
    },
    {
      path: ROOT_ROUTE_PATHS.HOME,
      name: ROOT_ROUTE_NAMES.HOME,
      component: () => import('../views/HomeView.vue'),
      beforeEnter: authMiddleware
    },
    {
      path: ROOT_ROUTE_PATHS.POKEMON + ':id',
      name: ROOT_ROUTE_NAMES.POKEMON,
      component: () => import('../views/PokemonView.vue'),
      beforeEnter: authMiddleware
    },
    {
      path: ROOT_ROUTE_PATHS.CART,
      name: ROOT_ROUTE_NAMES.CART,
      component: () => import('../views/CartView.vue'),
      beforeEnter: authMiddleware
    }
  ]
})

export default router

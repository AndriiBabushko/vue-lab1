import { createRouter, createWebHistory } from 'vue-router'
import { ROUTE_NAMES, ROUTE_PATHS } from '@/utils'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTE_PATHS.HOME,
      name: ROUTE_NAMES.HOME,
      component: () => import('../views/HomeView.vue')
    },
    {
      path: ROUTE_PATHS.LOGIN,
      name: ROUTE_NAMES.LOGIN,
      component: () => import('../views/LoginView.vue')
    },
    {
      path: ROUTE_PATHS.REGISTER,
      name: ROUTE_NAMES.REGISTER,
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: ROUTE_PATHS.TEST,
      name: ROUTE_NAMES.TEST,
      component: () => import('../views/TestView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: ROUTE_PATHS.RESULT,
      name: ROUTE_NAMES.RESULT,
      component: () => import('../views/ResultView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  const currentUser = await getCurrentUser()

  if ((to.name === ROUTE_NAMES.LOGIN || to.name === ROUTE_NAMES.REGISTER) && currentUser) {
    next(ROUTE_PATHS.HOME)
  } else if (to.matched.some((record) => record.meta.requiresAuth) && !currentUser) {
    next(ROUTE_PATHS.LOGIN)
  } else {
    next()
  }
})

export default router

import { useUserStore } from '@/stores/user'
import * as VueRouter from 'vue-router'
import { ROOT_ROUTE_NAMES } from '@/utils'

export const authMiddleware = (
  to: VueRouter.RouteLocationNormalized,
  from: VueRouter.RouteLocationNormalized,
  next: VueRouter.NavigationGuardNext
) => {
  const userStore = useUserStore()

  if (userStore.isLoggedIn) {
    next()
  } else {
    next({ name: ROOT_ROUTE_NAMES.LOGIN })
  }
}

import { defineStore } from 'pinia'
import i18n from '@/i18n'

interface User {
  username: string
  password: string
}

interface State {
  users: User[]
  currentUser: User | null
  isLoggedIn: boolean
  loginMessage: string | null
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    users: [],
    currentUser: null,
    isLoggedIn: false,
    loginMessage: null
  }),
  actions: {
    login(username: string, password: string) {
      const { t } = i18n.global
      const user = this.users.find((u) => u.username === username)

      if (user) {
        if (user.password === password) {
          this.currentUser = user
          this.isLoggedIn = true
          this.loginMessage = t('success.login')
        } else {
          this.loginMessage = t('error.invalidPassword')
        }
      } else {
        const newUser: User = { username, password }
        this.users.push(newUser)
        this.currentUser = newUser
        this.isLoggedIn = true
        this.loginMessage = t('success.register')
      }
    },
    logout() {
      const { t } = i18n.global

      this.currentUser = null
      this.isLoggedIn = false
      this.loginMessage = t('success.logout')
    },
    clearLoginMessage() {
      this.loginMessage = null
    }
  },
  persist: true
})

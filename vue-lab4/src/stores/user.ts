import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { type User } from 'firebase/auth'

interface State {
  currentUser: User | null
  isLoggedIn: boolean
  loginMessage: string | null
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    currentUser: null,
    isLoggedIn: false,
    loginMessage: null
  }),
  actions: {
    initAuthStateListener() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        this.currentUser = user
        this.isLoggedIn = !!user
      })
    },
    async register(email: string, password: string) {
      return await createUserWithEmailAndPassword(getAuth(), email, password)
        .then((registeredUser) => {
          this.loginMessage = 'Registration successful'
          return {
            success: true,
            user: registeredUser.user,
            message: 'Registration successful'
          }
        })
        .catch((error) => {
          this.loginMessage = error.message
          return {
            success: false,
            message: error.message
          }
        })
    },
    async login(email: string, password: string) {
      return await signInWithEmailAndPassword(getAuth(), email, password)
        .then((loggedInUser) => {
          this.loginMessage = 'Login successful'
          return {
            success: true,
            user: loggedInUser.user,
            message: 'Login successful'
          }
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/user-not-found':
              this.loginMessage = 'User not found'
              return {
                success: false,
                message: 'User not found'
              }
            case 'auth/wrong-password':
              this.loginMessage = 'Incorrect password'
              return {
                success: false,
                message: 'Incorrect password'
              }
            case 'auth/invalid-email':
              this.loginMessage = 'Invalid email'
              return {
                success: false,
                message: 'Invalid email'
              }
            default:
              this.loginMessage = 'Login failed'
              return {
                success: false,
                message: 'Login failed'
              }
          }
        })
    },
    async logout() {
      await signOut(getAuth())
        .then(() => {
          this.loginMessage = 'Logout successful'
        })
        .catch((error) => {
          this.loginMessage = 'Logout failed'
        })
    }
  }
})

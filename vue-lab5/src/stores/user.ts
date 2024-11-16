import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { type User } from 'firebase/auth'
import { addDoc, doc, getDoc } from 'firebase/firestore'
import { usersCollection } from '@/utils/firebase'

export enum UserSex {
  MALE = 'male',
  FEMALE = 'female',
  VUEJS = 'vuejs',
  OTHER = 'other'
}

export interface FirebaseUser {
  id: string
  name: string
  age: number
  email: string
  phone: string
  sex: UserSex
  password: string
}

interface State {
  currentUser: FirebaseUser | null
  isLoggedIn: boolean
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    currentUser: null,
    isLoggedIn: false
  }),
  actions: {
    initAuthStateListener() {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        this.isLoggedIn = !!user
        if (user) {
          try {
            const userDoc = await getDoc(doc(usersCollection, user.uid))
            if (userDoc.exists()) {
              this.currentUser = userDoc.data() as FirebaseUser
            } else {
              console.error('No such document!')
            }
          } catch (error) {
            console.error('Error fetching user:', error)
          }
        } else {
          this.currentUser = null
        }
      })
    },
    async register(user: Omit<FirebaseUser, 'id'>) {
      return await createUserWithEmailAndPassword(getAuth(), user.email, user.password)
        .then(async (registeredUser) => {
          try {
            await addDoc(usersCollection, { id: registeredUser.user.uid, ...user })
          } catch (error) {
            return {
              success: false
            }
          }

          return {
            success: true,
            user: registeredUser.user
          }
        })
        .catch(() => {
          return {
            success: false
          }
        })
    },
    async login(email: string, password: string) {
      return await signInWithEmailAndPassword(getAuth(), email, password)
        .then((loggedInUser) => {
          return {
            success: true,
            user: loggedInUser.user
          }
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/user-not-found':
              return {
                success: false,
                message: 'User not found'
              }
            case 'auth/wrong-password':
              return {
                success: false,
                message: 'Incorrect password'
              }
            case 'auth/invalid-email':
              return {
                success: false,
                message: 'Invalid email'
              }
            default:
              return {
                success: false,
                message: 'Login failed'
              }
          }
        })
    },
    async logout() {
      return await signOut(getAuth())
        .then(() => {
          return true
        })
        .catch(() => {
          return false
        })
    }
  }
})

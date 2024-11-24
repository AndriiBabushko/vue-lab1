import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
  apiKey: 'AIzaSyBiEfiKCfPHnbUqwDGoPW6xdQITNmjBs1E',
  authDomain: 'vue-lab4.firebaseapp.com',
  projectId: 'vue-lab4',
  storageBucket: 'vue-lab4.appspot.com',
  messagingSenderId: '742252686454',
  appId: '1:742252686454:web:f5cd390358d4ac63a80357'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const usersCollection = collection(db, 'users')

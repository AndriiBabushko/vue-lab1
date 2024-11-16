import './assets/base.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from '@/App.vue'
import router from '@/router'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'

import '@/utils/firebase'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.use(ToastService)
app.mount('#app')

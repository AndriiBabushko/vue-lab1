import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

const app= createApp(App);
app.use(VueReCaptcha, { siteKey: '6Ld5XUkqAAAAABA-4GMfBKzk7abBlKsTvb14OfaP' })
app.mount('#app')

import './assets/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

createApp(App)
  .use(VueReCaptcha, { siteKey: '6LeqVDkqAAAAAABBcYVoznBJfxXPltN_ZIFQJpCt' })
  .mount('#app')

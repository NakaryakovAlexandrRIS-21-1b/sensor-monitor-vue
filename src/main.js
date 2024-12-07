import './style.css'
import App from './App.vue'
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App);

app
  .use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
  .use(pinia)

app.mount('#app')

import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedstate'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'vuetify/styles'

const app = createApp(App)
app.use(vuetify)
const pinia = createPinia(); 
pinia.use(createPersistedState());
app.use(pinia)

app.mount('#app')

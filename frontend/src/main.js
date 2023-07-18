import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())

//Carregando informações do usuário via user store -- TODO: Implementar login
const store = useUserStore()
store.load('yoda')

app.use(router)

app.mount('#app')

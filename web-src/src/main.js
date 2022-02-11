import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

import { createPinia } from 'pinia'
app.use(createPinia())

app.mount('#app')

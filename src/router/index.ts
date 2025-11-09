import { createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import App from '@/views/App.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'home', component: App }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
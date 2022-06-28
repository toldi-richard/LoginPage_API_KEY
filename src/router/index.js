import { createRouter, createWebHashHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DataView from '../views/DataView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dataview',
    name: 'dataView',
    component: DataView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

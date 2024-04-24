import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import dashboardRouter from './modules/dashboard'
import demoRouter from './modules/demo'


export const constantRoutes = [
  {
    path: '/account/login',
    component: () => import('../views/login/Index.vue'),
    hidden: true
  },
  {
    path: '/',
    name: 'home',
    hidden: true,
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    hidden: true,
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  dashboardRouter,
  demoRouter
]

export const asyncRoutes = [
  dashboardRouter,
  demoRouter
]

const router = createRouter({
  history: createWebHistory(import.meta.env.APP_BASE_URL),
  routes: constantRoutes
})

export default router

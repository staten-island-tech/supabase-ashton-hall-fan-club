import { createRouter, createWebHistory } from 'vue-router'
import Schedules from '../components/Schedules.vue'
import HomeView from '../views/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/schedules',
      name: 'schedules',
      component: Schedules,
    },
    {
      path: '/about',
      name: 'about',
      //required: auth.isLoggedin,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignUp.vue'),
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Schedules from '../components/Schedules.vue'
import HomeView from '../views/InView.vue'
import { useAuthStore } from '../stores/auth'
import Calendar from '../components/Calendar.vue'
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
      beforeEnter: (to, from, next) => {
        const auth = useAuthStore()
        if (auth.isLoggedin) {
          next()
        } else {
          alert('Not Logged In')
          next('/') // redirect to login page if not logged in
        }
      },
    },
    {
      path: '/signUp',
      name: 'Sign Up',
      component: () => import('../components/SignUp.vue'),
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
    },
  ],
})

export default router

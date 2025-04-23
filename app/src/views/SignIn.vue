<template>
  <div class="about">
    <SignIn />
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import SignIn from '@/components/SignIn.vue'

const router = useRouter()
const auth = useAuthStore()

function handleLogout() {
  auth.logout()
  alert('Logout sucessful')
  router.push('/')
  console.log('logged out')
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

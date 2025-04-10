<template>
  <form @submit.prevent="handleLogin">
    <div>
      <label>Username:</label>
      <input v-model="username" type="text" required />
    </div>
    <div>
      <label>Password:</label>
      <input v-model="password" type="password" required />
    </div>
    <button type="submit">Login</button>
    <button @click="handleLogout">Log Out</button>
    <p v-if="auth.isLoggedin">Lebonbon</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')

const auth = useAuthStore()

function handleLogin() {
  if (username.value === 'admin' && password.value === 'password') {
    auth.login()
    successfulLogin()
  } else {
    alert('Invalid credentials!')
  }
  username.value = ''
  password.value = ''
}

function handleLogout() {
  auth.logout()
  alert('Logout sucessful')
}

function successfulLogin() {
  router.push('/about')
}
</script>

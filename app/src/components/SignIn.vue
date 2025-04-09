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
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')

const auth = useAuthStore()

function handleLogin() {
  if (username.value === 'admin' && password.value === 'password') {
    auth.login()
    alert('Login successful!')
  } else {
    alert('Invalid credentials!')
  }
}
</script>

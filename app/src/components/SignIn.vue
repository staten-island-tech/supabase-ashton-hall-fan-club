<template>
  <form @submit.prevent="handleLogin">
    <div>
      <label>Email:</label>
      <input v-model="email" type="text" required />
    </div>
    <div>
      <label>Password:</label>
      <input v-model="password" type="password" required />
    </div>
    <button type="submit">Login</button>
    <button @click="handleLogout">Log Out</button>
    <p v-if="auth.isLoggedin">Welcome!</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import supabase from '../supabase'

const router = useRouter()

const email = ref('')
const password = ref('')
const auth = useAuthStore()

async function handleLogin() {
  // Check if email exists in profiles table
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('email, user_id')
    .eq('email', email.value)
    .single()

  if (profileError || !profile) {
    alert('Invalid email or user not found!')
    return
  }

  // Now, attempt to sign in
  const { data, error: authError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (authError) {
    alert(`Login failed: ${authError.message}`)
    console.error('Auth error details:', authError)
    return
  }

  // If successful, proceed with login
  auth.login()
  successfulLogin()
  email.value = ''
  password.value = ''
}

function handleLogout() {
  auth.logout()
  alert('Logout successful')
}

function successfulLogin() {
  alert('Logged in')
  console.log('logged in')
}
</script>

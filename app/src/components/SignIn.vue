<template>
  <div
    class="min-h-screen flex items-center justify-center text-black dark:text-white transition-colors duration-500"
  >
    <form
      @submit.prevent="handleLogin"
      class="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
    >
      <h2 class="text-2xl font-bold text-center">Sign In</h2>

      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
          v-model="email"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Password</label>
        <input
          v-model="password"
          type="password"
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Sign In
      </button>

      <button
        @click="handleLogout"
        type="button"
        class="w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white py-2 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        Log Out
      </button>

      <p
        v-if="auth.isLoggedin"
        class="text-center text-green-600 dark:text-green-400 font-semibold"
      >
        Welcome back!
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { supabase } from './supabase'

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

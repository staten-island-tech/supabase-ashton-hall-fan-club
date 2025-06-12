<template>
  <div
    class="min-h-screen flex items-center justify-center text-black dark:text-white transition-colors duration-500"
  >
    <form
      @submit.prevent="handleSignUp"
      class="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
    >
      <h2 class="text-2xl font-bold text-center">Sign Up</h2>

      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
          v-model="email"
          type="email"
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
        Sign Up
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from './supabase'

const email = ref('')
const password = ref('')

async function handleSignUp() {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (error) {
    console.error('Signup error:', error.message)
    return
  }

  const user = data.user
  if (!user) return

  const { error: insertError } = await supabase
    .from('profiles')
    .insert([{ id: user.id, email: email.value }])

  if (insertError) {
    console.error('Insert error:', insertError.message)
  }
}
</script>

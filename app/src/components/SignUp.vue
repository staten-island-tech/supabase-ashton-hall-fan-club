<template>
  <div>
    <form @submit.prevent="handleSignUp">
      <div>
        <label>Email:</label>
        <input v-model="email" type="text" required />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" required />``
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import supabase from '../supabase'
const email = ref('')
const password = ref('')

async function handleSignUp() {
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (error) {
    console.error('Signup error:', error.message)
  } else {
    console.log('Signup success:', data)
  }

  email.value = ''
  password.value = ''
}
</script>

<style lang="scss" scoped></style>

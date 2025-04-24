<template>
  <div>
    <form @submit.prevent="handleSignUp">
      <div>
        <label>Email:</label>
        <input v-model="email" type="text" required />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import supabase from './supabase'
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

  const userId = data.user?.id
  const userEmail = email.value

  // Insert into your custom table
  const { error: insertError } = await supabase
    .from('profiles') // replace with your actual table name
    .insert([{ email: userEmail, user_id: userId }])

  if (insertError) {
    console.error('Insert error:', insertError.message)
  } else {
    console.log('User email saved to table')
  }

  email.value = ''
  password.value = ''
}
</script>

<style lang="scss" scoped></style>

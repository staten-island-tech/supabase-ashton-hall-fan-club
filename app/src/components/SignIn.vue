<template>
  <div>
    <form @submit="submit">
      <div class="login">
        <h1>Username</h1>
        <input type="text" v-model="username" required />
      </div>
      <div class="password">
        <h1>Password</h1>
        <input type="password" v-model="password" required />
      </div>
      <div class="submitButton">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

function submit(event) {
  event.preventDefault()
  console.log('Username:', username.value)
  console.log('Password:', password.value)
  username.value = ''
  password.value = ''
}
</script>

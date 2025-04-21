<template>
  <div>
    <form @submit.prevent="handleSignUp">
      <div>
        <label>Username:</label>
        <input v-model="email" type="text" required />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

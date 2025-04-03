<template>
  <div>
    <form @submit="submit">
      <div class="login">
        <h1>Username</h1>
        <input type="text" :value="username" required />
      </div>
      <div class="password">
        <h1>Password</h1>
        <input type="password" :value="password" required />
      </div>
      <div class="submitButton">
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script></script>

<style lang="scss" scoped></style>

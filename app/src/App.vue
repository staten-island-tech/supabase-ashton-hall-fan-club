<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
    <header class="bg-[#3B82F6] text-white p-4 shadow">
      <div class="max-w-6xl mx-auto flex items-center">
        <h1 class="text-2xl font-bold">Timefolio</h1>
        <nav class="ml-auto space-x-4 text-sm">
          <RouterLink to="/" class="hover:underline transition duration-200 hover:text-[#d1eaff]"
            >Sign In</RouterLink
          >
          <RouterLink
            to="/signUp"
            class="hover:underline transition duration-200 hover:text-[#d1eaff]"
            >Sign Up</RouterLink
          >
          <RouterLink
            to="/schedules"
            class="hover:underline transition duration-200 hover:text-[#d1eaff]"
            >Schedules</RouterLink
          >
        </nav>
      </div>
    </header>

    <main class="max-w-6xl mx-auto py-12 px-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-white">
    <header class="bg-blue-600 dark:bg-blue-800 shadow-md">
      <div
        class="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8"
      >
        <h1 class="text-xl font-bold text-white">Schedula</h1>
        <nav class="space-x-6 text-sm sm:text-base">
          <RouterLink
            to="/"
            class="text-white hover:text-blue-200 dark:hover:text-blue-300 transition-colors"
            active-class="font-semibold underline"
            exact
          >
            Sign In
          </RouterLink>
          <RouterLink
            to="/signUp"
            class="text-white hover:text-blue-200 dark:hover:text-blue-300 transition-colors"
            active-class="font-semibold underline"
          >
            Sign Up
          </RouterLink>
          <RouterLink
            to="/schedules"
            class="text-white hover:text-blue-200 dark:hover:text-blue-300 transition-colors"
            active-class="font-semibold underline"
          >
            Schedules
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">
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

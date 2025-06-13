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
        <nav class="flex flex-wrap gap-3 justify-center sm:justify-start">
          <RouterLink
            to="/"
            class="flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition"
            active-class="from-blue-700 to-blue-800 font-semibold"
            exact
          >
            <span>🔑</span> Sign In
          </RouterLink>

          <RouterLink
            to="/signUp"
            class="flex items-center gap-2 text-white bg-gradient-to-r from-blue-400 to-blue-500 px-4 py-2 rounded-full hover:from-blue-500 hover:to-blue-600 transition"
            active-class="from-blue-600 to-blue-700 font-semibold"
          >
            <span>📝</span> Sign Up
          </RouterLink>

          <RouterLink
            to="/schedules"
            class="flex items-center gap-2 text-white bg-gradient-to-r from-blue-300 to-blue-400 px-4 py-2 rounded-full hover:from-blue-400 hover:to-blue-500 transition"
            active-class="from-blue-500 to-blue-600 font-semibold"
          >
            <span>📅</span> Schedules
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

nav a {
  all: unset;
  color: white !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: linear-gradient(to right, #3b82f6, #2563eb);
  transition: all 0.3s ease;
}

nav a:hover {
  background: linear-gradient(to right, #2563eb, #1d4ed8);
}

nav a.router-link-exact-active {
  background: linear-gradient(to right, #1e40af, #1e3a8a);
  font-weight: 600;
}
</style>

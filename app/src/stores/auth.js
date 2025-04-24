import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedin = ref(false)

  function login() {
    isLoggedin.value = true
  }

  function logout() {
    isLoggedin.value = false
  }

  return { isLoggedin, login, logout }
})

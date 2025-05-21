import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/components/supabase'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedin = ref(false)
  const userId = ref(null)

  async function fetchUserId() {
    const { data, error } = await supabase.auth.getUser()

    if (error || !data?.user) {
      console.error('Error fetching user:', error?.message)
      userId.value = null
      isLoggedin.value = false
    } else {
      userId.value = data.user.id
      isLoggedin.value = true
    }
  }

  function login() {
    isLoggedin.value = true
  }

  function logout() {
    isLoggedin.value = false
    userId.value = null
  }

  return {
    isLoggedin,
    userId,
    fetchUserId,
    login,
    logout,
  }
})

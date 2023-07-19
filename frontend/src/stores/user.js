import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFetchUsers } from '@/composables/UserData'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const load = async(_username) => {
    const { users: u } = await useFetchUsers(_username)
    user.value = u.value
  }

  return { user, load }
})

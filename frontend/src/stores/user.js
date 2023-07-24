import { ref, inject } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {

  const Parse = inject('Parse')

  const user = ref(null)

  const load = async(username) => {
    //fake login
    const _user = await Parse.User.logIn(username, username)
    user.value = _user.toJSON()
  }

  return { user, load }
})

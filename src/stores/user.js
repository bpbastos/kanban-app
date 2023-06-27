import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const occupation = ref('')
  const biografy = ref('')
  const status = ref('')
  const member_since = ref('')
  const birthday = ref('')
  const gender = ref('')
  const mobile = ref('')
  const address = ref('')
  const email = ref('')
  const profile_picture = ref('')

  return {
    username,
    firstName,
    lastName,
    occupation,
    biografy,
    status,
    member_since,
    birthday,
    gender,
    mobile,
    address,
    email,
    profile_picture
  }
})

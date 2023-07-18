import { watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { useFetchUsers } from '@/composables/UserData'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      username: '',
      firstName: '',
      lastName: '',
      occupation: '',
      biografy: '',
      status: '',
      memberSince: '',
      birthday: '',
      gender: '',
      mobile: '',
      address: '',
      email: '',
      profilePicture: ''
    }
  },
  actions: {
    async load(username) {
      const { users: user, isReady } = useFetchUsers(username)
      watchEffect(() => {
        if (isReady.value) {
          this.username = user.value.username
          this.firstName = user.value.first_name
          this.lastName = user.value.last_name
          this.occupation = user.value.occupation
          this.biografy = user.value.biografy
          this.status = user.value.status
          this.memberSince = user.value.member_since
          this.birthday = user.value.birthday
          this.gender = user.value.gender
          this.mobile = user.value.mobile
          this.address = user.value.address
          this.email = user.value.email
          this.profilePicture = user.value.profile_picture
        }
      })      
     }
  }
})

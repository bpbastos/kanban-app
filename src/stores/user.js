import { defineStore } from 'pinia'
import { useFetchUser } from '@/composables/UserData'

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
      const { user, error, fetch } = useFetchUser()
      await fetch(username)
      if (error.value === null) {
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
    }
  }
})

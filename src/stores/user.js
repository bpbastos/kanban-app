import { defineStore } from 'pinia'
import UserDataService from '@/services/UserDataService'

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
    load(username) {
      UserDataService.getByUsername(username)
        .then((response) => {
          let user = response.data
          this.username = user.username
          this.firstName = user.first_name
          this.lastName = user.last_name
          this.occupation = user.occupation
          this.biografy = user.biografy
          this.status = user.status
          this.memberSince = user.member_since
          this.birthday = user.birthday
          this.gender = user.gender
          this.mobile = user.mobile
          this.address = user.address
          this.email = user.email
          this.profilePicture = user.profile_picture
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
})

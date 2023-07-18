import { watchEffect,ref,toRef } from 'vue'
import { defineStore } from 'pinia'
import { useFetchUsers } from '@/composables/UserData'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isReady = ref(false)

  const load = (_username) => {
    const { users: _user, isReady: _ready } = useFetchUsers(toRef(_username))    
      //console.log(user)
      watchEffect(() => {
        if (isReady.value) {
          user.value = _user.value
          isReady.value = _ready.value
          //console.log(_user.value.profilePicture.url)
        }
      })    
  }

  return { user, isReady, load }
  /*state: () => {
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
      //console.log(user)
      watchEffect(() => {
        if (isReady.value) {
          console.log(user)
          this.username = user.value.username
          this.firstName = user.value.firstName
          this.lastName = user.value.lastName
          this.occupation = user.value.occupation
          this.biografy = user.value.biografy
          this.status = user.value.status
          this.memberSince = user.value.memberSince
          this.birthday = user.value.birthday
          this.gender = user.value.gender
          this.mobile = user.value.mobile
          this.address = user.value.address
          this.email = user.value.email
          this.profilePicture = user.value.profilePicture
        }
      })      
     }
  }*/
})

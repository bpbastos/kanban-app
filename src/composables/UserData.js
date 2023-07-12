import { ref } from 'vue'
import { useLoaderStore } from '@/stores/loader'
import http from '@/http-common'

//Get user
export function useFetchUser(showLoading=false) {
    const user = ref([])
    const error = ref(null)
    const store = useLoaderStore()
  
    //Get user from api
    const fetch = async(username) => {
      try {
        if (showLoading) store.setLoading(true)
        const response = await http.get(`/user?username=${username}`)
        user.value = response.data
        if (showLoading) store.setLoading(false)
      } catch (error) {
        error.value = error
      }
    }
  
    return { user, error, fetch }
}


import { ref } from 'vue'
import { useLoaderStore } from '@/stores/loader'
import http from '@/http-common'

//Get priority
export function useFetchPriority(showLoading=false) {
    const priority = ref([])
    const error = ref(null)
    const store = useLoaderStore()
  
    //Get priority from api
    const fetch = async(id) => {
      try {
        if (showLoading) store.setLoading(true)
        const response = await http.get(`/priorities/${id}`)
        priority.value = response.data
        if (showLoading) store.setLoading(false)
      } catch (error) {
        error.value = error
      }
    }
  
    return { priority, error, fetch }
}

export function useFetchPriorities(showLoading=false) {
    const priorities = ref([])
    const error = ref(null)
    const store = useLoaderStore()
  
    //Get Priorities from api
    const fetch = async() => {
      try {
        if (showLoading) store.setLoading(true)
        const response = await http.get(`/priorities`)
        priorities.value = response.data
        if (showLoading) store.setLoading(false)
      } catch (error) {
        error.value = error
      }
    }

    return { priorities, error, fetch }
}
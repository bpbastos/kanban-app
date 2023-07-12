import { ref } from 'vue'
import http from '@/http-common'
import { useLoaderStore } from '@/stores/loader'

//Get Workflow
export function useFetchWorkflow(showLoading=false) {
    const workflow = ref([])
    const error = ref(null)
    const store = useLoaderStore()
  
    //Get Workflow from api
    const fetch = async(id) => {
      try {
        if (showLoading) store.setLoading(true)
        const response = await http.get(`/Workflows/${id}`)
        workflow.value = response.data
        if (showLoading) store.setLoading(false)
      } catch (error) {
        error.value = error
      }
    }
  
    return { workflow, error, fetch }
}

export function useFetchWorkflows(showLoading=false) {
    const workflows = ref([])
    const error = ref(null)
    const store = useLoaderStore()
  
    //Get Workflows from api
    const fetch = async() => {
      try {
        if (showLoading) store.setLoading(true)
        const response = await http.get(`/Workflows`)
        workflows.value = response.data
        if (showLoading) store.setLoading(false)
      } catch (error) {
        error.value = error
      }
    }

    return { workflows, error, fetch }
}
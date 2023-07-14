import http from '@/http-common'
import { watchEffect, toValue} from 'vue'
import { useLoaderStore } from '@/stores/loader'
import { useAsyncState } from '@vueuse/core'

//Fetch workflow from api
export function useFetchWorkflows(workflowId, options = {}) {

  const { showLoading = false } = options
  const store = useLoaderStore()

  //Get board from api (using useAsyncState for non blocking setup)
  const { state, isLoading, isReady, error, execute } = useAsyncState(
    (args) => {
      const id = args?.id || 0
      const url = id > 0 ? `/workflows/${id}` : '/workflows'
      //console.log(url)
      return http.get(url).then(response => response.data)
    },
    {},
    {
      immediate: false,
      onSuccess: () => { if(showLoading) store.setLoading(false) },
      onError: () => { if(showLoading) store.setLoading(false) }
    }
  )  

  watchEffect(() => {
    store.setLoading(true)
    execute(0, { id: toValue(workflowId) })
  })    

  return { workflows: state, error, isLoading, isReady }
}
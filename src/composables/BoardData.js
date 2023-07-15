import http from '@/http-common'
import { watchEffect, toValue} from 'vue'
import { useLoaderStore } from '@/stores/loader'
import { useAlertStore } from '@/stores/alert'
import { useAsyncState } from '@vueuse/core'

//Fetch boards from api
export function useFetchBoards(boardId=0,options={}) {

  const { showLoading = true } = options
  const loaderStore = useLoaderStore()
  const alertStore = useAlertStore()

  //Get board from api (using useAsyncState for non-blocking setup)
  const { state, isLoading, isReady, error, execute } = useAsyncState(
    (args) => {
      const id = args?.id || 0
      const url = id > 0 ? `/boards/${id}` : '/boards'
      return http.get(url).then(response => response.data)
    },
    {},
    {
      immediate: false,
      onSuccess: () => { handleSuccess() },
      onError: () => { handleError() }
    }
  ) 
  
  const handleError = () => {
    alertStore.error(error)
    if(showLoading) loaderStore.setLoading(false) 
  }

  const handleSuccess = () => {
    if(showLoading) loaderStore.setLoading(false) 
  } 

  const fetch = (_boardId) => {
    execute(0, { id: toValue(_boardId) })
  }

  watchEffect(() => {
    loaderStore.setLoading(true)
    fetch(boardId)
  })

  return { boards: state, error, isLoading, isReady, fetch }
}
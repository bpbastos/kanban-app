import http from '@/http-common'
import { watchEffect, toValue } from 'vue'
import { useLoaderStore } from '@/stores/loader'
import { useNotificationStore } from '@/stores/notification'
import { useAsyncState } from '@vueuse/core'

//Fetch priorities from api
export function useFetchPriorities(priorityId=0,options={}) {

  const { showLoading = true } = options
  const loaderStore = useLoaderStore()
  const notificationStore = useNotificationStore()


  //Get priority from api (using useAsyncState for non-blocking setup)
  const { state, isLoading, isReady, error, execute } = useAsyncState(
    (args) => {
      const id = args?.id || 0
      const url = id > 0 ? `/priorities/${id}` : '/priorities'
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
    notificationStore.error(`${error.value.code} - ${error.value.message}`)
    if(showLoading) loaderStore.setLoading(false) 
  }

  const handleSuccess = () => {
    if(showLoading) loaderStore.setLoading(false) 
  } 

  const fetch = (_priorityId) => {
    execute(0, { id: toValue(_priorityId) })
  }

  watchEffect(() => {
    loaderStore.setLoading(true)
    fetch(priorityId)
  })

  return { priorities: state, error, isLoading, isReady, fetch }
}
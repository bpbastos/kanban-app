import http from '@/http-common'
import { watchEffect, toValue } from 'vue'
import { useLoaderStore } from '@/stores/loader'
import { useAsyncState } from '@vueuse/core'

//Fetch priorities from api
export function useFetchPriorities(priorityId=0,options={}) {

  const { showLoading = true } = options
  const store = useLoaderStore()

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
      onSuccess: () => { if(showLoading) store.setLoading(false) },
      onError: () => { if(showLoading) store.setLoading(false) }
    }
  )  

  const fetch = (_priorityId) => {
    execute(0, { id: toValue(_priorityId) })
  }

  watchEffect(() => {
    store.setLoading(true)
    fetch(priorityId)
  })

  return { priorities: state, error, isLoading, isReady, fetch }
}
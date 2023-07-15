import http from '@/http-common'
import { watchEffect, toValue } from 'vue'
import { useLoaderStore } from '@/stores/loader'
import { useAsyncState } from '@vueuse/core'

//Fetch users from api
export function useFetchUsers(username='',options={}) {

  const { showLoading = true } = options
  const store = useLoaderStore()

  //Get board from api (using useAsyncState for non-blocking setup)
  const { state, isLoading, isReady, error, execute } = useAsyncState(
    (args) => {
      return http.get(`/user?username=${args.un}`).then(r => r.data)
    },
    {},
    {
      immediate: false,
      onSuccess: () => { if(showLoading) store.setLoading(false) },
      onError: () => { if(showLoading) store.setLoading(false) }
    }
  )  

  const fetch = (_username) => {
    execute(0, { un: toValue(_username) })
  }

  watchEffect(() => {
    store.setLoading(true)
    fetch(username)
  })

  return { users: state, error, isLoading, isReady, fetch }
}
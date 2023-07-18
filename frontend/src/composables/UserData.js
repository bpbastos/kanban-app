import { parse } from '@/http-common'
import { watchEffect, toValue } from 'vue'
import { useLoaderStore } from '@/stores/loader'
import { useNotificationStore } from '@/stores/notification'
import { useAsyncState } from '@vueuse/core'

//Fetch users from api
export function useFetchUsers(username='',options={}) {

  const { showLoading = true } = options
  const loaderStore = useLoaderStore()
  const notificationStore = useNotificationStore()
  //console.log(http.baseURL)
  //Get board from api (using useAsyncState for non-blocking setup)
  const { state, isLoading, isReady, error, execute } = useAsyncState(
    (args) => {
      //const url = computed(()=>`/users?where={"username":"${args.un}"}`)
      return parse.get(`/users?where={"username":"${args.un}"}`).then(r => r.data.results[0])
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

  const fetch = (_username) => {
    execute(0, { un: toValue(_username) })
  }

  watchEffect(() => {
    loaderStore.setLoading(true)
    fetch(username)
  })

  return { users: state, error, isLoading, isReady, fetch }
}
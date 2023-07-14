import http from '@/http-common'
import { ref, watchEffect, toValue, onMounted } from 'vue'
import { useLoaderStore } from '@/stores/loader'
import { useAsyncState } from '@vueuse/core'

//Fetch boards from api
export function useFetchBoards(boardId, options = {}) {

  const { showLoading = false } = options
  const store = useLoaderStore()

  //Get board from api (using useAsyncState for non blocking setup)
  const { state, isLoading, isReady, error, execute } = useAsyncState(
    (args) => {
      const id = args?.id || 0
      const url = id > 0 ? `/boards/${id}` : '/boards'
      //console.log(url)
      return http.get(url).then(response => response.data)
    },
    {},
    {
      onSuccess: () => { if(showLoading) store.setLoading(false) },
      onError: () => { if(showLoading) store.setLoading(false) }
    }
  )  

  watchEffect(async() => {
    store.setLoading(true)
    execute(0, { id: toValue(boardId) })
  })    

  return { boards: state, error, isLoading, isReady }
}
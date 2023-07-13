import http from '@/http-common'
import { ref, watchEffect, toValue } from 'vue'
import { useLoaderStore } from '@/stores/loader'
import { useAsyncState } from '@vueuse/core'

//Fetch boards from api
export function _useFetchBoards(boardId, options = {}) {

  const { showLoading = false } = options
  const store = useLoaderStore()

  //Get board from api (non blocking setup)
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

//Get board
export function useFetchBoard(showLoading=false) {
    const board = ref([])
    const error = ref(null)
    const store = useLoaderStore()
  
    //Get board from api
    const fetch = async(id) => {
      try {
        if (showLoading) store.setLoading(true)
        const response = await http.get(`/boards/${id}`)
        board.value = response.data
        if (showLoading) store.setLoading(false)
      } catch (error) {
        error.value = error
      }
    }
  
    return { board, error, fetch }
}

export function useFetchBoards(showLoading=false) {
    const boards = ref([])
    const error = ref(null)
    const store = useLoaderStore()
  
    //Get boards from api
    const fetch = async() => {
      try {
        if (showLoading) store.setLoading(true)
        const response = await http.get(`/boards`)
        boards.value = response.data
        if (showLoading) store.setLoading(false)
      } catch (error) {
        error.value = error
      }
    }

    return { boards, error, fetch }
}
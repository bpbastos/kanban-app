import http from '@/http-common'
import { ref, watchEffect, toValue, onMounted } from 'vue'
import { useLoaderStore } from '@/stores/loader'

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
import { computed } from 'vue'
import { useBaseFetch } from '@/composables/BaseData'

//Fetch boards from api
export async function useFetchBoards(boardId=0,options={}) {
  const url = computed(()=>boardId > 0 ? `/classes/boards?where={"objectId":"${boardId}"}` : '/classes/boards')
 
  return await useBaseFetch(url, { refetch: true, ...options })
}
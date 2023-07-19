import { computed } from 'vue'
import { useBaseFetch } from '@/composables/BaseData'

//Fetch workflows from api
export async function useFetchWorkflows(workflowId=0,options={}) {

  const url = computed(()=>workflowId > 0 ? `/classes/workflows?where={"objectId":"${workflowId}"}` : '/classes/workflows')
  
  const { isFetching, error, data } =  await useBaseFetch(url, { refetch: true, ...options })

  return { workflows: data, error, isFetching }  

}
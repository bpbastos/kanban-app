import { toValue, computed } from 'vue'
import { useBaseFetch } from '@/composables/BaseData'

//Fetch priorities from api
export function useFetchPriorities(priorityId,name) {
  const url = computed(()=> {
    const classUrl = '/classes/priorities'
    let search = ''
    if (toValue(priorityId)) {
      search = `/${toValue(priorityId)}`
    }
    if (toValue(name)) {
      search = '?where={'
      search += encodeURI(`"name":"${toValue(name)}"`)
      search += '}'
    }
    return classUrl+search
  })
  return useBaseFetch(url, { refetch: true })
}
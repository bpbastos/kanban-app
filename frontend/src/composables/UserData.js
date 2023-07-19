import { computed } from 'vue'
import { useBaseFetch } from '@/composables/BaseData'
//Fetch users from api
export async function useFetchUsers(username='',options={}) {

  const url = computed(()=>`/users?where={"username":"${username}"}`)

  const { isFetching, error, data } = await useBaseFetch(url, { refetch: true, showLoading: true, ...options })

  return { users: data, error, isFetching }
}
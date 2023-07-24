import { computed,toValue,ref,isProxy,toRaw, watch, watchEffect } from 'vue'
import { useBaseFetch } from '@/composables/BaseData'
import { useParseFirst, useParseFind } from '@/composables/useParse'

//Fetch users from api
export  async function useFetchUsers(username) {
  const users = ref(null)
  const error = ref(null)
  watchEffect(async()=>{
    const { data, error:e } = await useParseFirst('_User',{"where":{"username":toValue(username)}});
    users.value = data.value
    error.value = e.value
  })
  return { users, error }
}
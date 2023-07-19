import { createFetch } from '@vueuse/core'
import { useLoaderStore } from '@/stores/loader'
import { useNotificationStore } from '@/stores/notification'

export const useBaseFetch = createFetch({
  baseUrl: 'http://localhost:1337/parse',
  combination: 'chaining',
  options: {
    async beforeFetch({ options }) {
        const loaderStore = useLoaderStore()
        loaderStore.setLoading(true)  
        options.headers = {
            'X-Parse-Application-Id': 'kanbanapp',
            'X-Parse-REST-API-Key': 'dev',
            'Content-type': 'application/json',
            ...options.headers
        }
        return { options }
    },
    onFetchError({ error }) {
        const loaderStore = useLoaderStore()
        const notificationStore = useNotificationStore()
        notificationStore.error(`${error.value.code} - ${error.value.message}`)
        loaderStore.setLoading(false) 
    },
    afterFetch(ctx) {
        const loaderStore = useLoaderStore()
        let r = JSON.parse(ctx.data)
        if (r.results.length > 1) ctx.data = r.results
        else ctx.data = r.results[0]
        loaderStore.setLoading(false) 
        return ctx
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})

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
        notificationStore.error(`${error.message}`)
        loaderStore.setLoading(false) 
    },
    afterFetch(ctx) {
        const loaderStore = useLoaderStore()
        let r = JSON.parse(ctx.data)
        console.log(r.results[0])
        ctx.data = r.results?.length == 1 ? r.results[0] : r.results
        //console.log(r)
        /*if (r.results?.length == 0) ctx.data = "{}"
        if (r.results?.length == 1) ctx.data = `{${r.results[0]}}`
        if (r.results?.length > 1) ctx.data = `{${r.results}}`
        if (!r.results) ctx.data = r*/

        //console.log(ctx.data)
        loaderStore.setLoading(false) 
        return ctx
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})

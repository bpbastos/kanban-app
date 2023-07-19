import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoaderStore = defineStore('loader', () => {
  const isLoading = ref(false)
  const showLoading = ref(true)
  function setLoading(val) {
    if(showLoading.value) isLoading.value = val
    else isLoading.value = false
  }
  return { isLoading, setLoading }
})

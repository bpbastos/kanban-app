import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlertStore = defineStore('alert', () => {
  const messages = ref([])

  function info(m) {
    const tempMsg = {
        type: 'info',
        text: m
    }
    messages.value.unshift(tempMsg)
  }

  function success(m) {
    const tempMsg = {
        type: 'success',
        text: m
    }
    messages.value.unshift(tempMsg)
  }

  function warning(m) {
    const tempMsg = {
        type: 'warning',
        text: m
    }
    messages.value.unshift(tempMsg)
  }  

  function error(m) {
    const tempMsg = {
        type: 'error',
        text: m
    }
    messages.value.unshift(tempMsg)
  }  

  return { messages, info, success, warning, error }
})
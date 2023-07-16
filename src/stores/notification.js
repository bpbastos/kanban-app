import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useNotificationStore = defineStore('notification', () => {
  //Store the notifications on localStorare
  const messages = useLocalStorage('notifications', [])

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
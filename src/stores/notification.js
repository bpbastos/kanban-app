import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useNotificationStore = defineStore('notification', () => {
  //Store the notifications on localStorare
  const messages = useLocalStorage('notifications', [])
  
  function info(m) {
    const d = new Date()
    const tempMsg = {
      type: 'info',
      text: m,
      date: d.toISOString()
    }     
    messages.value.unshift(tempMsg)
  }

  function success(m) {
    const d = new Date()    
    const tempMsg = {
      type: 'info',
      text: m,
      date: d.toISOString()
    }   
    console.log(currentPath.value)
    messages.value.unshift(tempMsg)
  }

  function warning(m) {
    const d = new Date()    
    const tempMsg = {
      type: 'info',
      text: m,
      date: d.toISOString()
    }   
    messages.value.unshift(tempMsg)
  }  

  function error(m) {
    const d = new Date()    
    const tempMsg = {
      type: 'info',
      text: m,
      date: d.toISOString()
    }   
    messages.value.unshift(tempMsg)
  }  

  return { messages, info, success, warning, error }
})
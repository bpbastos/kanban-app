<template>
  <details class="dropdown dropdown-end" ref="dropdown">
    <summary class="btn btn-ghost btn-circle m-0 p-0 font-light text-primary-content">
      <div class="indicator">
        <svg v-if="!messageCount" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class="w-5 h-5">
          <path fill-rule="evenodd"
            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
            clip-rule="evenodd" />
        </svg>
        <svg v-if="messageCount" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class="w-5 h-5">
          <path
            d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
          <path fill-rule="evenodd"
            d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z"
            clip-rule="evenodd" />
        </svg>
        <span v-if="messageCount" class="badge badge-xs indicator-item" :class="`bg-${lastMessageType}`">
          {{ messageCount }}
        </span>
      </div>
    </summary>
    <ul tabindex="0" class="mt-2 p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-72" v-if="messageCount">
      <li v-for="(message, index) in store.messages.slice(0, 5)" class="border-b" @click="removeNotification(index)">
        <div class="alert" :class="`alert-${message.type}`">
          <svg v-if="message.type == 'info'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <svg v-if="message.type == 'success'" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6"
            fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-if="message.type == 'warning'" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6"
            fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <svg v-if="message.type == 'error'" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6"
            fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-xs">{{ message.text }}</span>
        </div>
      </li>
      <li><a href="#" class="block bg-neutral text-neutral-content text-center font-bold py-2">Ver todas as notificações</a></li>
    </ul>
  </details>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useNotificationStore } from '@/stores/notification'

const store = useNotificationStore()
const dropdown = ref(null)
const messageCount = ref(0)
const lastMessageType = ref('')

onClickOutside(dropdown, (event) => {
  if (dropdown.value.open)
    dropdown.value.removeAttribute('open')
})

const removeNotification = (i) => {
  store.messages.splice(i, 1)
  messageCount.value = store.messages.length
}

watchEffect(() => {
  if (store.messages.length) {
    messageCount.value = store.messages.length
    lastMessageType.value = store.messages[0].type
  }
})
</script>

<template>
  <div class="relative z-10 block w-auto py-2" @keyup.esc="isOpen = false">
    <a href="#" @click="isOpen = !isOpen" class="relative z-10 block overflow-hidden">
      <span class="text-secondary opacity-80 text-lg font-bold pr-5">{{ selectedItem }}</span>
      <i
        class="fa-solid fa-chevron-down bg-gray-300 rounded-full p-2 drop-shadow-2xl text-primary"
      ></i>
    </a>
    <button
      v-if="isOpen"
      @click="isOpen = !isOpen"
      tabindex="-1"
      class="fixed inset-0 h-full w-full cursor-default"
    ></button>
    <div v-if="isOpen" class="absolute mt-2 bg-white w-auto rounded-lg shadow-xl">
      <a
        href="#"
        @click="changeSelected('Sprint 1 - Fullstack Basico')"
        class="block px-4 py-2 w-auto text-gray-800 hover:bg-primary hover:text-white hover:rounded-t-lg"
        >Sprint 1 - Fullstack Basico</a
      >
      <a
        href="#"
        @click="changeSelected('Sprint 2 - Frontend Avançado')"
        class="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white"
        >Sprint 2 - Frontend Avançado</a
      >
      <a
        href="#"
        @click="changeSelected('Sprint 3 - Backend Avançado')"
        class="block px-4 py-2 text-gray-800 hover:bg-primary hover:text-white hover:rounded-b-lg"
        >Sprint 3 - Backend Avançado</a
      >
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const isOpen = ref(false)
const selectedItem = ref('Sprint 1 - Fullstack Basico')

const changeSelected = (text) => {
  selectedItem.value = text
  isOpen.value = false
}
</script>

<template>
  <div class="relative z-10 block w-auto py-2" @keyup.esc="isOpen = false">
    <a href="#" @click="isOpen = !isOpen" class="relative z-10 block overflow-hidden">
      <span class="text-secondary opacity-80 text-lg font-bold pr-5">{{ selectedItem }}</span>
      <i class="fa-solid fa-chevron-down bg-gray-300 rounded-full p-2 drop-shadow-2xl text-primary"></i>
    </a>
    <button v-if="isOpen" @click="isOpen = !isOpen" tabindex="-1"
      class="fixed inset-0 h-full w-full cursor-default"></button>
    <div v-if="isOpen" class="absolute mt-2 bg-white w-auto rounded-lg shadow-xl">
      <a v-for="board in boards" href="#" @click="changeSelected(board)"
        class="block px-4 py-2 w-auto text-gray-800 hover:bg-primary hover:text-white hover:rounded-t-lg">{{ board.name }}</a>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import BoardDataService from '../services/BoardDataService'

const emit = defineEmits(['change'])
const isOpen = ref(false)
const selectedItem = ref('')
const boards = ref([])

const changeSelected = (board) => {
  selectedItem.value = board.name
  isOpen.value = false
  emit('change', board)
}

onMounted(async () => {
  BoardDataService.getAll()
    .then((response) => {
      boards.value = response
      selectedItem.value = boards.value.length ? boards.value[0].name : 'Nenhum quadro encontrado'
      emit('change', boards.value[0])
    })
    .catch((e) => {
      console.log(e)
    })
})
</script>

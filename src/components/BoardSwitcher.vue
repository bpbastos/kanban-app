<template>
  <div class="dropdown">
    <label tabindex="0" class="btn m-1 text-lg">
      {{ selectedItem }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-7 h-7 bg-neutral-content rounded-full drop-shadow-2xl text-primary"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box text-base"
      ref="items"
    >
      <li>
        <a v-for="(board, index) in boards" @click="changeSelected(board)">{{ board.name }}</a>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted,computed } from 'vue'
import { _useFetchBoards } from '@/composables/BoardData'

const { boards } = _useFetchBoards(0, { showLoading: true })
const selectedItem = ref('')
const items = ref(null
)
const emit = defineEmits(['change'])

const changeSelected = (board) => {
  selectedItem.value = board.name
  emit('change', board)
  items.value.blur()
}

onMounted(() => {
  selectedItem.value = computed(()=> {
   console.log(boards.value[0]?.name)
   return boards.value?.length ? boards.value[0]?.name : 'Nenhum quadro encontrado'
   //return boards.value[0]?.name
  })
})
</script>

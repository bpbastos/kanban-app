<template>
  <details class="dropdown" ref="dropdown">
    <summary tabindex="0" class="btn btn-active bg-base-200 m-1 text-lg hover:bg-base-100">
      {{ selectedItem }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-7 h-7 rounded-full drop-shadow-2xl bg-base-100 text-primary"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </summary>
    <ul
      tabindex="0"
      class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box text-base"
    >
      <li>
        <a v-for="(board, index) in boards" @click="changeSelected(board)">{{ board.name }}</a>
      </li>
    </ul>
</details>  
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { useFetchBoards } from '@/composables/BoardData'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'


//Fetch all boards
const { boards, isReady } = useFetchBoards()

const router = useRouter()

const selectedItem = ref('')
//const items = ref(null)
const dropdown = ref(null)

const emit = defineEmits(['change','loaded'])

const closeDropdown = () => {
  if (dropdown.value.open)
    dropdown.value.removeAttribute('open')  
}

const changeSelected = (board) => {
  selectedItem.value = board.name
  closeDropdown()
  router.push({ name: 'Board', params: { id: board.id } }) 
}

onClickOutside(dropdown, (event) => {
  closeDropdown()
})


onMounted(()=>{
  //Wait for data be loaded from api (async)
  watch(isReady, () => {
    if (isReady.value) {
      selectedItem.value = 'Nenhum quadro encontrado'
      if (boards.value.length > 0) {
        //Get the first board and pushes a new route when component is mounted
        selectedItem.value = boards.value[0]?.name
        //Emit a loaded event for the parent component
        emit('loaded',boards.value[0])
      }
    }
  })
})
</script>
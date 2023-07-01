<template>
  <div @keyup.esc="isOpen = false">
    <div class="relative z-10 block items-center overflow-hidden rounded-md border bg-white" @click="isOpen = !isOpen">
      <a href="#" class="border-e px-4 py-2 text-sm/none text-white "
        :class="`bg-${selectedItem.color}-400 hover:bg-${selectedItem.color}-400`">
        {{ selectedItem.name }}
      </a>
      <button class="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
        <span class="sr-only">Menu</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <button v-if="isOpen" @click="isOpen = !isOpen" tabindex="-1"
      class="fixed inset-0 h-full w-full cursor-default"></button>    
    <div v-if="isOpen" class="absolute mt-2 w-56 p-1 rounded-md border border-gray-100 bg-white shadow-lg"
      role="menu">
      <div class="space-y-1">
        <a v-for="item in items" @click="changeSelected(item)" href="#"
          class="block rounded-lg px-4 py-2 text-sm text-white" :class="`bg-${item.color}-400 hover:bg-${item.color}-500`"
          role="menuitem">
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['change'])

const isOpen = ref(false)
const selectedItem = ref('')

const props = defineProps({
  items: Array,
  selectedId: Number
})

selectedItem.value = props.items.find(function (item) {
  return props.selectedId == item.id
})

const changeSelected = (item) => {
  selectedItem.value = item
  isOpen.value = false
  emit('change', item)
}
</script>

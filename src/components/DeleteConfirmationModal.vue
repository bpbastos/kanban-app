<template>
  <div
    v-if="show"
    class="absolute z-50 inset-0 fade top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
  >
    <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
      <div class="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
      <div
        class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative"
      >
        <div class="md:flex items-center">
          <div
            class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto"
          >
            <i class="bx bx-error text-3xl"></i>
          </div>
          <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <p class="font-bold">{{ title }}</p>
            <p class="text-sm text-gray-700 mt-1">{{ message }}</p>
          </div>
        </div>
        <div class="text-center md:text-right mt-4 md:flex md:justify-end">
          <button
            @click="deleteAction"
            class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
          >
            {{ btnDeleteLabel }}
          </button>
          <button
            @click="cancelAction"
            class="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
          >
            {{ btnCancelLabel }}
          </button>
        </div>
      </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)

const props = defineProps({
  title: String,
  message: String,
  btnDeleteLabel: String,
  btnCancelLabel: String,
  showModal: String
})

const emit = defineEmits(['delete', 'cancel'])

const deleteAction = () => {
  emit('delete')
}

const cancelAction = () => {
  emit('cancel')
}

if (props.showModal === 'show') show.value = true
</script>

<template>
  <article class="flex flex-col space-y-5 rounded-lg bg-white p-3 drop-shadow-xl">
    <div class="flex justify-between">
      <span
        v-if="priority === 'low'"
        class="block w-24 rounded bg-blue-500 p-1 text-center text-xs font-light text-white opacity-80"
      >
        Prioridade baixa
      </span>
      <span
        v-if="priority === 'normal'"
        class="block w-24 rounded bg-green-500 p-1 text-center text-xs font-light text-white opacity-80"
      >
        Prioridade média
      </span>
      <span
        v-if="priority === 'high'"
        class="block w-24 rounded bg-purple-500 p-1 text-center text-xs font-light text-white opacity-80"
      >
        Prioridade alta
      </span>
      <div
        class="text-red-400 hover:text-red-700 cursor-pointer text-xs"
        @click="emit('delete', id)"
      >
        <svg
          class="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
          ></path>
        </svg>
      </div>
    </div>
    <span class="text-base font-normal text-gray-900">{{ title }}</span>
    <div class="flex flex-row space-x-1 items-center text-xs" v-if="totalSubTasks > 0">
      <div class="bg-blue-100 flex rounded-3xl px-1 sm:px-1.5 py-0.5 text-blue-900 mr-1">
        <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19">
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path
            d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm6.003 11L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"
          ></path>
        </svg>
        <h4 class="tracking-wider">{{ totalSubTasksDone }}/{{ totalSubTasks }}</h4>
      </div>
      <progress
        class="shadow-2xl w-12 sm:w-20"
        :value="totalSubTasksDone"
        :max="totalSubTasks"
      ></progress>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  priority: String,
  title: String,
  totalSubTasksDone: Number,
  totalSubTasks: Number
})
</script>

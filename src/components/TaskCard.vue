<template>
  <article class="flex flex-col space-y-5 rounded-lg bg-white p-4 drop-shadow-xl">
    <span v-if="priority === 'low'"
      class="block w-24 rounded bg-blue-500 p-1 text-center text-xs font-light text-white opacity-80"
    >
      Prioridade baixa
    </span>
    <span v-if="priority === 'normal'"
      class="block w-24 rounded bg-green-500 p-1 text-center text-xs font-light text-white opacity-80"
    >
      Prioridade média
    </span>
    <span v-if="priority === 'high'"
      class="block w-24 rounded bg-purple-500 p-1 text-center text-xs font-light text-white opacity-80"
    >
    Prioridade alta
    </span>        
    <span class="text-base font-normal text-gray-900">{{ title }}</span>
    <div class="flex flex-row space-x-1 items-center text-xs opacity-70">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="text-secondary h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
      <span class="pr-2">{{ coments }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="text-secondary h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
        />
      </svg>
      <span>{{ attachments }}</span>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  priority: String,
  title: String,
  coments: String,
  attachments: String
})
</script>

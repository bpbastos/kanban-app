<template>
  <header
    class="flex flex-row justify-between h-14 bg-gradient-to-r from-header1 from-0% via-header2 via-100% drop-shadow-xl"
  >
    <nav
      class="flex justify-center items-center w-[120px] flex-shrink-0 bg-logo bg-opacity-25 drop-shadow-xl"
    >
      <p class="text-lg text-white font-bold m-auto">kanban</p>
    </nav>
    <RouterLink to="/user/profile" class="flex justify-center items-center flex-shrink-0 gap-4 border-l-2 mr-6">
      <span class="text-sm text-white font-light ml-8">Bruno Bastos</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-10 h-10 bg-gray-300 rounded-full p-3 shadow-xl text-white"
      >
        <path
          fill-rule="evenodd"
          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
          clip-rule="evenodd"
        />
      </svg>
    </RouterLink>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header
    class="flex flex-row justify-between h-14 bg-gradient-to-r from-header1 from-0% via-header2 via-100% drop-shadow-xl"
  >
    <nav
      class="flex justify-center items-center w-[120px] flex-shrink-0 bg-logo bg-opacity-25 drop-shadow-xl"
    >
      <p class="text-lg text-white font-bold m-auto">kanban</p>
    </nav>
    <RouterLink v-if="username" :to="{ name: 'UserProfile', params: { id: username } }" class="flex justify-center items-center flex-shrink-0 gap-4 border-l-2 mr-6">
      <span class="text-sm text-white font-light ml-8">{{ firstName }} {{ lastName }}</span>
      <img class="shadow-xl rounded-full w-10 h-10 align-middle border-none object-cover" :src="profilePicture" alt="{{ firstName }} {{ lastName }}" />
    </RouterLink>
  </header>
</template>

<script setup>
const props = defineProps({
  username: String,
  firstName: String,
  lastName: String,
  profilePicture: String
})
</script>

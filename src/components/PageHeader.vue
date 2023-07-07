<template>
  <header
    class="flex flex-row justify-between h-14 bg-gradient-to-r from-secondary from-0% via-primary via-100% drop-shadow-xl"
  >
    <nav
      class="flex justify-center items-center w-[120px] flex-shrink-0 bg-primary bg-opacity-25 drop-shadow-xl hover:bg-secondary-focus hover:cursor-pointer"
    >
      <p class="text-xl font-bold m-auto text-primary-content">kanban</p>
    </nav>
    <NavLink
      v-if="username"
      :to="{ name: 'UserProfile', params: { id: username } }"
      class="flex justify-center items-center flex-shrink-0 border-primary-content  border-l-[1px] hover:bg-primary-focus p-2"
      active-class="bg-primary-focus"
    >
      <span class="text-sm font-light text-primary-content mr-2">{{ firstName }} {{ lastName }}</span>
      <div class="avatar online">
        <div class="w-10 rounded-full">
          <img :src="profilePicture" alt="{{ firstName }} {{ lastName }}" />
        </div>
      </div>
    </NavLink>
  </header>
</template>

<script setup>
import NavLink from '@/components/NavLink.vue'

const props = defineProps({
  username: String,
  firstName: String,
  lastName: String,
  profilePicture: String
})
</script>

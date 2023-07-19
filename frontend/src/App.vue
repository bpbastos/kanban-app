<template>
  <div class="container mx-auto max-w-screen-xl max-h-screen ">
    <PageHeader v-if="store.user"
      :username="store.user.username"
      :firstName="store.user.firstName"
      :lastName="store.user.lastName"
      :profilePicture="store.user.profilePicture.url"
    />
    <div class="flex shadow-2xl">
      <SideBar />
      <main class="py-8 px-8 w-screen">
        <div class="flex flex-col">
          <RouterView />
        </div>
      </main>
    </div>
  </div>

  <LoadingOverlay />
</template>

<script setup>
import { onMounted } from 'vue'
import { themeChange } from 'theme-change'
import { RouterView } from 'vue-router'

import PageHeader from '@/components/PageHeader.vue'
import SideBar from '@/components/SideBar.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

import { useUserStore } from '@/stores/user'

const store = useUserStore()

onMounted(async() => {
  themeChange(false)
  await store.load('yoda')
})
</script>

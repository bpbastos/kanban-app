<template>
  <div class="container mx-auto max-w-screen-xl max-h-screen ">
    <PageHeader
      :username="username"
      :firstName="firstName"
      :lastName="lastName"
      :profilePicture="profilePicture"
    />
    <div class="flex bg-neutral">
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
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'

import PageHeader from './components/PageHeader.vue'
import SideBar from './components/SideBar.vue'
import LoadingOverlay from './components/LoadingOverlay.vue'

import { useUserStore } from '@/stores/user'

const store = useUserStore()

const { username, firstName, lastName, profilePicture } = storeToRefs(store)
</script>

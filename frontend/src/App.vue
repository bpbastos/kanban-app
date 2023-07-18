<template>
  <div class="container mx-auto max-w-screen-xl max-h-screen ">
    <PageHeader v-if="store.user"
      :username="username"
      :firstName="firstName"
      :lastName="lastName"
      :profilePicture="profilePicture"
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
import { computed, onMounted, watchEffect } from 'vue'
import { themeChange } from 'theme-change'
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'

import PageHeader from '@/components/PageHeader.vue'
import SideBar from '@/components/SideBar.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

import { useUserStore } from '@/stores/user'


const store = useUserStore()

const username = computed(()=>store.user.username)
const firstName = computed(()=>store.user.firstName)
const lastName = computed(()=>store.user.lastName)
const profilePicture = computed(()=>store.user.profilePicture.url)

onMounted(() => {
  themeChange(false)
})
</script>

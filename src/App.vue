<template>
  <div class="container mx-auto max-w-screen-xl font-Roboto bg-white">
    <PageHeader />
    <div class="flex">
      <SideBar />
      <main class="min-h-screen w-screen bg-main py-8 px-8">
        <div class="flex flex-col">
          <router-view />
        </div>
      </main>
    </div>
  </div>
  
</template>

<script setup>
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import SideBar from './components/SideBar.vue'
</script>

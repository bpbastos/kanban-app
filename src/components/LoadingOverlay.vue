<template>
  <div v-if="isLoading" id="loading">
    <div class="d-flex justify-content-center">
      <div
        class="spinner-border text-primary"
        role="status"
        style="width: 3rem; height: 3rem; z-index: 20"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { useLoaderStore } from '@/stores/loader'
import { storeToRefs } from 'pinia'

const store = useLoaderStore()

const { isLoading } = storeToRefs(store)
</script>

<style scoped>
#loading {
  visibility: visible;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  opacity: 0.5;
  filter: alpha(opacity=50);
}
</style>

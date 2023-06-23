<template>
  <div :class="color" class="h-full w-64 rounded-lg pt-1 drop-shadow-xl opacity-80">
    <section class="flex flex-col space-y-4 px-3 pb-3 rounded-b-lg bg-board drop-shadow-xl">
      <p class="text-secondary text-lg font-medium pt-4">{{ boardName }}</p>
      <TaskCard
        priority="low"
        task-title="Magna ultricies adipiscing nullam placerat lacinia urna curae."
        coments="4"
        attachments="6"
      />
      <TaskCard
        priority="high"
        task-title="Iaculis quis turpis a nunc."
        coments="4"
        attachments="6"
      />
      <TaskCard
        priority="normal"
        task-title="A suscipit ullamcorper."
        coments="4"
        attachments="6"
      />
      <RouterLink to="/addtask" class="flex flex-row space-x-2 items-center justify-center text-secondary text-base font-medium">
        <i class="fa-solid fa-plus"></i>
        <p class="">Adicionar tarefa</p>
      </RouterLink>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import TaskCard from './TaskCard.vue'
const props = defineProps({
  boardName: String,
  color: String
})
</script>

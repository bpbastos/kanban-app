<template>
  <div class="pb-8"><BoardSwitcher /></div>
  <div class="flex flex-wrap justify-strech gap-4 pb-8">
    <BoardCard board-name="Backlog" color="bg-purple-400" />
    <BoardCard board-name="Em andamento" color="bg-orange-400" />
    <BoardCard board-name="Em análise" color="bg-blue-400" />
    <BoardCard board-name="Concluído" color="bg-green-400" />
  </div>
</template>

<script setup>
import BoardSwitcher from '../components/BoardSwitcher.vue'
import BoardCard from '../components/BoardCard.vue'
</script>

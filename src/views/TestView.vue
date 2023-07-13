<template>
    <input v-model="boardId" placeholder="Board id" />
    <div>Board: {{ boards }}</div>
    <div>Erro: {{ error }}</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useFetchBoards } from '@/composables/BoardData'
const boardId = ref(0)
const { boards, error, isReady }  = useFetchBoards(boardId, { showLoading: true })

onMounted(()=>{
    if(isReady.value) console.log(boards.value)
    
})
</script>
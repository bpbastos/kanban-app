<template>
  <div class="rounded-lg pt-1 drop-shadow-xl bg-green-400">
    <section class="flex flex-col justify-center items-center p-10 rounded-b-lg bg-board drop-shadow-xl">

      <div class="w-full h-full divide-gray-300 divide-y-2">
        <h1 class="leading-8 my-1 text-secondary text-lg font-medium">Adicionar tarefa</h1>
        <div>
          <form class="rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-secondary text-sm font-bold mb-2" for="title">
                Título
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline"
                id="title" type="text" placeholder="Título">
            </div>
            <div class="mb-4">
              <label class="block text-secondary text-sm font-bold mb-2" for="priority">
                Prioridade
              </label>
              <div class="inline-block relative w-full">
                <select 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline"
                  name="priority" id="priority">
                  <option value="low">Baixa</option>
                  <option value="normal">Média</option>
                  <option value="high">Alta</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-secondary text-sm font-bold mb-2" for="board">
                Quadro
              </label>
              <div class="inline-block relative w-full">
                <select 
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline"
                  name="board" id="board">
                  <option value="1">Sprint 1 - Fullstack Basico</option>
                  <option value="2">Sprint 2 - Frontend Avançado</option>
                  <option value="3">Sprint 3 - Backend Avançado</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>  
            <div class="mb-4">
              <label class="block text-secondary text-sm font-bold mb-2" for="">
                Etapa
              </label>
              <div class="inline-block relative w-full">
                <select
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline"
                  name="board" id="board">
                  <option value="1">Backlog</option>
                  <option value="2">Em andamento</option>
                  <option value="3">Em análise</option>
                  <option value="4">Concluído</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-secondary">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div> 
            <div class="mb-4">
              <SubTasks />                          
            </div>                                            
          </form>
        </div>
      </div>

    </section>
  </div>
</template>

<script setup>
import SubTasks from '@/components/SubTasks.vue'
const props = defineProps({
  workflowId: String,
  boardId: String
})
</script>
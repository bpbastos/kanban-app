<template>
  <div class="container mx-auto max-w-screen-xl max-h-screen font-Roboto bg-white">
    <PageHeader />
    <div class="flex">
      <SideBar />
      <main class="min-h-screen w-screen bg-main py-8 px-8">
        <div class="flex flex-col">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
  <LoadingOverlay /> 
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import SideBar from './components/SideBar.vue'
import LoadingOverlay from './components/LoadingOverlay.vue';


//Carregando informações do usuário na user store -- TODO: Implementar login
import { useUserStore } from '@/stores/user'
import UserDataService from '@/services/UserDataService'
const store = useUserStore()
const user = ref([])

onMounted(async () => {
  UserDataService.get(1) 
    .then((response) => {
      user.value = response.data
      store.username = user.value.username
      store.firstName = user.value.first_name
      store.lastName = user.value.last_name
      store.occupation = user.value.occupation
      store.biografy = user.value.biografy
      store.status = user.value.status
      store.member_since = user.value.member_since
      store.birthday = user.value.birthday
      store.gender = user.value.gender
      store.mobile = user.value.mobile
      store.address = user.value.address
      store.email = user.value.email
      store.profile_picture = user.value.profile_picture
    })
    .catch((e) => {
      console.log(e)
    })  
})
</script>

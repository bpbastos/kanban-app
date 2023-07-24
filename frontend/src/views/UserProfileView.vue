<template>
    <div class="flex items-center justify-center w-12/12">
      <div class="card pt-[2px] bg-primary shadow-2xl">
        <div class="card bg-base-200 p-4">
          <div class="avatar">
            <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img v-if="store.user" :src="store.user.profilePicture.url" />
            </div>
          </div>
          <h1 class="leading-8 my-1 font-bold text-xl">{{ store.user.firstName }} {{ store.user.lastName }}</h1>
          <h3 class="font-lg text-semibold leading-6">{{ store.user.occupation }}</h3>
          <p class="leading-6 mb-2">
            {{ store.user.biografy }}
          </p>
          <div class="card bg-base-100 p-2">
            <div class="grid md:grid-cols-2 ">
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-bold">Primeiro Nome</div>
                <div class="px-4 py-2">{{ store.user.firstName }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-bold">Último Nome</div>
                <div class="px-4 py-2">{{ store.user.lastName }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-bold">Gênero</div>
                <div class="px-4 py-2">{{ store.user.gender }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-bold">Celular</div>
                <div class="px-4 py-2">{{ store.user.mobile }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-bold">Endereço</div>
                <div class="px-4 py-2">{{ store.user.address }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-bold">E-mail</div>
                <div class="px-4 py-2">
                  <a class="text-blue-800" href="mailto:{{ store.user.email }}">{{ store.user.email }}</a>
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-bold">Aniversário</div>
                <div class="px-4 py-2">{{ store.user.birthday.iso }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { useUserStore } from '@/stores/user'
  
  const store = useUserStore()
  
  </script>
  
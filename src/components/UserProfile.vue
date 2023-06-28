<template>
    <div class="rounded-lg pt-1 drop-shadow-xl bg-green-400">
        <section class="flex flex-col p-3 rounded-b-lg bg-board drop-shadow-xl">
            <img class="shadow rounded-full w-28 h-28 align-middle border-none obj" :src="profilePicture" :alt="username" />
            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{{ firstName }} {{ lastName }}</h1>
            <h3 class="text-gray-600 font-lg text-semibold leading-6">{{ occupation }}</h3>
            <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
                {{ biografy }}
            </p>
            <ul
                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li class="flex items-center py-3">
                    <span>Status</span>
                    <span class="ml-auto"><span class="bg-green-400 py-1 px-2 rounded text-white text-sm">{{ status
                    }}</span></span>
                </li>
                <li class="flex items-center py-3">
                    <span>Usuário desde</span>
                    <span class="ml-auto">{{ memberSince }}</span>
                </li>
            </ul>
            <div class="mt-3">
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span clas="text-green-500">
                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                    <span class="tracking-wide">Sobre</span>
                </div>
                <div class="text-gray-700">
                    <div class="grid md:grid-cols-2 text-sm">
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Primeiro Nome</div>
                            <div class="px-4 py-2">{{ firstName }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Último Nome</div>
                            <div class="px-4 py-2">{{ lastName }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Gênero</div>
                            <div class="px-4 py-2">{{ gender }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Celular</div>
                            <div class="px-4 py-2">{{ mobile }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Endereço</div>
                            <div class="px-4 py-2">{{ address }}</div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">E-mail</div>
                            <div class="px-4 py-2">
                                <a class="text-blue-800" href="mailto:{{ email }}">{{ email }}</a>
                            </div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div class="px-4 py-2 font-semibold">Aniversário</div>
                            <div class="px-4 py-2">{{ birthday }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const store = useUserStore()

const { username,
    firstName,
    lastName,
    occupation,
    biografy,
    status,
    memberSince,
    birthday,
    gender,
    mobile,
    address,
    email,
    profilePicture } = storeToRefs(store)

</script>
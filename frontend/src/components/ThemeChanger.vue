<template>
  <details class="dropdown dropdown-end" ref="dropdown">
    <summary class="btn btn-ghost btn-circle m-0 p-0 font-light text-primary-content">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    </summary>
    <ul
      class="mt-2 p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box"
      data-choose-theme
    >
      <li class="p-1"><a data-set-theme="corporate">corporate</a></li>
      <li class="p-1"><a data-set-theme="dark">dark</a></li>      
      <li class="p-1"><a data-set-theme="lofi">lofi</a></li>
      <li class="p-1"><a data-set-theme="light">light</a></li>
      <li class="p-1"><a data-set-theme="cupcake">cupcake</a></li>
      <li class="p-1"><a data-set-theme="bumblebee">bumblebee</a></li>
      <li class="p-1"><a data-set-theme="emerald">emerald</a></li>
      <li class="p-1"><a data-set-theme="retro">retro</a></li>
      <li class="p-1"><a data-set-theme="cyberpunk">cyberpunk</a></li>
      <li class="p-1"><a data-set-theme="pastel">pastel</a></li>
      <li class="p-1"><a data-set-theme="fantasy">fantasy</a></li>
      <li class="p-1"><a data-set-theme="black">black</a></li>
      <li class="p-1"><a data-set-theme="business">business</a></li>
    </ul>
  </details>
</template>
<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const dropdown = ref(null)

const closeDropdown = () => {
  if (dropdown.value.open)
    dropdown.value.removeAttribute('open')
}

onClickOutside(dropdown, (event) => {
  closeDropdown()
})
</script>

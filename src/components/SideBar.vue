<template>
  <div class="">
    <div class="hidden sm:block">
      <aside
        class="flex flex-col w-[120px] min-h-screen flex-shrink-0 bg-white drop-shadow-xl py-1"
      >
        <NavLink
        :to="{name: 'Board'}"
          class="flex flex-col items-center justify-center py-8"
          active-class="border-l-2 border-primary"
          inactive-class="opacity-50"
        >
          <i class="fa-solid fa-server text-primary"></i>
          <figcaption class="text-secondary">Quadros</figcaption>
        </NavLink>
        <NavLink
          :to="{name: 'Calendar'}"
          class="flex flex-col items-center justify-center py-8"
          active-class="border-l-2 border-primary"
          inactive-class="opacity-50"
        >
          <i class="fa-regular fa-calendar-days text-primary"></i>
          <figcaption class="text-secondary">Calendário</figcaption>
        </NavLink>
      </aside>
    </div>
  </div>
</template>

<script setup>
import NavLink from './NavLink.vue'
</script>

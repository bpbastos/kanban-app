<template>
  <div class="shadow-2xl">
    <div class="hidden sm:block">
      <aside
        class="flex flex-col w-[120px] min-h-screen flex-shrink-0 drop-shadow-xl py-1"
      >
        <NavLink
        :to="{name: 'Board'}"
          class="flex flex-col items-center justify-center py-8 hover:bg-neutral-focus"
          active-class="border-l-2 bg-neutral-focus"
          inactive-class="opacity-50"
        >
          <i class="fa-solid fa-server text-primary"></i>
          <figcaption class="mt-2 text-neutral-content">Quadros</figcaption>
        </NavLink>
        <NavLink
          :to="{name: 'Calendar'}"
          class="flex flex-col items-center justify-center py-8 hover:bg-neutral-focus"
          active-class="border-l-2 bg-neutral-focus"
          inactive-class="opacity-50"
        >
          <i class="fa-regular fa-calendar-days text-primary"></i>
          <figcaption class="mt-2 text-neutral-content">Calendário</figcaption>
        </NavLink>
      </aside>
    </div>
  </div>
</template>

<script setup>
import NavLink from './NavLink.vue'
</script>

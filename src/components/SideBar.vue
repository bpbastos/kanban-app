<template>
  <div class="shadow-2xl text-base-content">
    <div class="hidden sm:block">
      <aside
        class="flex flex-col w-[120px] min-h-screen flex-shrink-0 drop-shadow-xl py-1"
      >
        <NavLink
        :to="{name: 'Board' }"
          class="flex flex-col items-center justify-center py-8 hover:bg-base-100"
          active-class="border-l-2 border-primary bg-base-200"
          inactive-class="opacity-50"
        >
          <i class="fa-solid fa-server text-primary"></i>
          <figcaption class="mt-2">Quadros</figcaption>
        </NavLink>
        <NavLink
          :to="{name: 'Calendar'}"
          class="flex flex-col items-center justify-center py-8 hover:bg-base-100"
          active-class="border-l-2 border-primary bg-base-200"
          inactive-class="opacity-50"
        >
          <i class="fa-regular fa-calendar-days text-primary"></i>
          <figcaption class="mt-2">Calendário</figcaption>
        </NavLink>
      </aside>
    </div>
  </div>
</template>

<script setup>
import NavLink from '@/components/NavLink.vue'
</script>

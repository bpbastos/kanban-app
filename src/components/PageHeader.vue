<template>
  <div class="navbar min-h-0 bg-base-100 bg-gradient-to-r from-secondary from-0% via-primary via-100%">
    <div class="flex-1">
      <a class="btn btn-ghost rounded normal-case text-2xl text-primary-content">kanban</a>
    </div>
    <div class="flex-none gap-2">
      <select data-choose-theme class="select select-bordered select-sm">
        <option disabled selected>Tema</option>
        <option value="corporate">corporate</option>
        <option value='light'>light</option>
        <option value='dark'>dark</option>
        <option value='cupcake'>cupcake</option>
        <option value='bumblebee'>bumblebee</option>
        <option value='emerald'>emerald</option>
        <option value='synthwave'>synthwave</option>
        <option value='retro'>retro</option>
        <option value='cyberpunk'>cyberpunk</option>
        <option value='valentine'>valentine</option>
        <option value='halloween'>halloween</option>
        <option value='garden'>garden</option>
        <option value='forest'>forest</option>
        <option value='aqua'>aqua</option>
        <option value='lofi'>lofi</option>
        <option value='pastel'>pastel</option>
        <option value='fantasy'>fantasy</option>
        <option value='wireframe'>wireframe</option>
        <option value='black'>black</option>
        <option value='luxury'>luxury</option>
        <option value='dracula'>dracula</option>
        <option value='cmyk'>cmyk</option>
        <option value='autumn'>autumn</option>
        <option value='business'>business</option>
        <option value='acid'>acid</option>
        <option value='lemonade'>lemonade</option>
        <option value='night'>night</option>
        <option value='coffee'>coffee</option>
        <option value='winte'>winte</option>
      </select>
      <AppNotification />
      <label tabindex="0" class="btn btn-ghost btn-circle avatar online">
        <div class="w-10 rounded-full">
          <NavLink v-if="username" :to="{ name: 'UserProfile', params: { id: username } }">
            <img :src="profilePicture" />
          </NavLink>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
import NavLink from '@/components/NavLink.vue'
import AppNotification from '@/components/AppNotification.vue';

const props = defineProps({
  username: String,
  firstName: String,
  lastName: String,
  profilePicture: String
})
</script>

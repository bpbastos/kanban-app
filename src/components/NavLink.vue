<template>
    <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
      <slot />
    </a>
    <RouterLink
      v-else
      v-bind="$props"
      custom
      v-slot="{ isActive, href, navigate }"
    >
      <a
        v-bind="$attrs"
        :href="href"
        @click="navigate"
        :class="isActive ? activeClass : inactiveClass"
      >
        <slot />
      </a>
    </RouterLink>
  </template>
  
  <script>
  import { RouterLink } from 'vue-router'
  
  export default {
    name: 'NavLink',
    inheritAttrs: false,
  
    props: {
      // add @ts-ignore if using TypeScript
      ...RouterLink.props,
      inactiveClass: String,
    },
  
    computed: {
      isExternalLink() {
        return typeof this.to === 'string' && this.to.startsWith('http')
      },
    },
  }
  </script>
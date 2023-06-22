<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
<router-link to="app" class="link">
  <h1>Go to the app</h1>
</router-link>
</template>

<style scoped>
.link {
  color: white;
  transition: all 300ms ease-in-out;
}
.link:hover {
  color: magenta;
}
</style>

<script setup lang="ts">
import { useStore } from 'vuex';
import { Save } from '../store';
import TaskForm from './TaskForm.vue'

const store = useStore()
window.addEventListener('beforeunload', () => {
  Save(store)
})

</script>

<template>
<h1>App</h1>
<TaskForm />
<div>list</div>
</template>

<style scoped>
</style>

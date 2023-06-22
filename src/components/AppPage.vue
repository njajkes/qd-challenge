<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex';
import { Save, getterGetTaskIds } from '../store';
import TaskForm from './TaskForm.vue'
import { TaskStatus } from '../entities';
import Task from './Task.vue'

const store = useStore()
window.addEventListener('beforeunload', () => {
  Save(store)
})
const todo = computed(() => getterGetTaskIds(store, TaskStatus.ToDo))
const inProgress = computed(() => getterGetTaskIds(store, TaskStatus.InProgress))
const done = computed(() => getterGetTaskIds(store, TaskStatus.Done))
</script>

<template>

<h1>App</h1>
<TaskForm />
<Task v-if="todo.length" v-for="id in todo" :id="id" />
<Task v-if="inProgress.length" v-for="id in inProgress" :id="id" />
<Task v-if="done.length" v-for="id in done" :id="id" />
</template>

<style scoped>
</style>

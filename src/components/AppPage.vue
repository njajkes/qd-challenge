<script setup lang="ts">
import { useStore } from 'vuex';
import { Save } from '../store';
import TaskForm from './TaskForm.vue'
import { TaskStatus } from '../entities';
import TaskList from './TaskList.vue'

const store = useStore()
window.addEventListener('beforeunload', () => {
  Save(store)
})
</script>

<template>
<h1>App</h1>
<TaskForm />
<div class="tasks tasks-controller">
  <TaskList :status="TaskStatus.ToDo" />
  <TaskList :status="TaskStatus.InProgress" />
  <TaskList :status="TaskStatus.Done" />
</div>
</template>

<style scoped>
.tasks {
  display: flex;
  gap: 1rem;
}
.tasks-controller {
  flex-direction: row;
}
@media (max-width: 700px) {
  .tasks-controller {
    flex-direction: column;
  }
}
</style>

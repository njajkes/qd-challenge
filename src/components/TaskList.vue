<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { TaskStatus } from '../entities';
import TaskComponent from './Task.vue'
import { getterGetTaskIds } from '../store';

interface TaskListProps {
  status: TaskStatus
}

const { status } = defineProps<TaskListProps>()
const store = useStore()
const taskIds = computed(() => getterGetTaskIds(store, status))

</script>

<template>
<div class="list-wrapper" v-if="taskIds.length">
  <h2 
    :class="
      status === TaskStatus.Done 
      ? 'title__done' 
      : status === TaskStatus.InProgress 
        ? 'title__in-progress' 
        : 'title__to-do' 
    "
  >
    {{ status }}
  </h2>
  <div class="list">
    <TaskComponent v-for="id in taskIds" :id="id" :key="id" />
  </div>
</div>
</template>

<style scoped>
.list-wrapper {
  box-shadow: 0px 0px 10px #5e5e5e;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 8px;
  padding: 5px 10px;
  background-color: #3a3a3a;
  max-height: 350px;
  overflow: auto;
}
.list-wrapper > h2 {
  margin: 0;
  padding-left: 5px;
}
.list {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 350px;
  overflow: auto;
}
.title__to-do {
  color: var(--to-do);
}
.title__in-progress {
  color: var(--in-progress);
}
.title__done {
  color: var(--done);
}
</style>
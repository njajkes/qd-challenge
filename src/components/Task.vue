<script setup lang="ts">
import { useStore } from 'vuex';
import { Task as TaskEntity, TaskStatus } from '../entities';
import { computed, ref } from 'vue';
import { commitChangeTask, commitDeleteTask, getterGetTaskById } from '../store';

const edit = ref<boolean>(false);

const store = useStore()

interface TaskProps {
  id: TaskEntity['id']
}
const { id } = defineProps<TaskProps>()

const task = computed(() => getterGetTaskById(store, id) as TaskEntity)

const formText = ref<string>(task.value.title);

const onDblClick = () => {
  edit.value = true;
}

const changeStatus = (e: Event) => {
  const element = e.target as HTMLOptionElement
  
  commitChangeTask(store, { ...task.value, status: element.value as TaskStatus })
}

const changeTitle = () => {
  commitChangeTask(store, { ...task.value, title: formText.value })

  edit.value = false
}

const deleteItem = () => {
  commitDeleteTask(store, id)
}

</script>

<template>
<div @dblclick="onDblClick" class="task task-controller">
  <select :value="task.status" @change="changeStatus">
    <option :value="TaskStatus.ToDo">{{ TaskStatus.ToDo }}</option>
    <option :value="TaskStatus.InProgress">{{ TaskStatus.InProgress }}</option>
    <option :value="TaskStatus.Done">{{ TaskStatus.Done }}</option>
  </select>
  <input class="task-text" v-if="edit" v-model="formText" />
  <p class="task-text" v-else>{{ task.title }}</p>
  <button v-if="edit" @click="changeTitle">
    ✔️
  </button>
  <button v-else @click="deleteItem">
    ❌
  </button>
</div>
</template>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.task-text {
  box-sizing: border-box;
  width: 150px;
  text-align: center;
  margin: 0;
  padding: 0;
}
.task-controller {
  flex-direction: row;
}
@media (max-width: 700px) {
  .task-controller {
    flex-direction: column;
    padding: 10px 0;
  }
  .task-controller > button {
    width: 100%;
  }
  .task-controller > select {
    width: 100%;
  }
  .task-controller > input, p {
    width: 100%;
  }
}
</style>
<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { commitAddTask } from '../store';

const title = ref<string>('')
const store = useStore()

const onSubmit = (e: Event) => {
  e.preventDefault()
  if (title.value) {
    commitAddTask(store, title.value)
    title.value = ''
  }
}

</script>

<template>
<div class="form-wrapper">
  <h3>Enter new task</h3>
  <form @submit.prevent="onSubmit">
    <input v-model.trim="title" />
    <button>Submit</button> 
  </form>
</div>
</template>

<style scoped>
.form-wrapper {
  margin-bottom: 15px;
}
</style>

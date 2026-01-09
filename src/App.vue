<script setup>
import { ref } from "vue";
import tasklList from "./components/tasklList.vue";
import { useTask } from "./hooks/useTask";
import EditTaskModal from "./components/EditTaskModal.vue";

const {
  tasks,
  newTask2,
  addTask,
  deleteTask,
  changeTask,
  isEditModalOpen,
  taskToEdit,
  openEditModal,
  closeEditModal,
  saveEditTask,
} = useTask();
</script>

<template>
  <div class="todo-app">
    <h1>Mi Lista de Tareas</h1>

    <div class="input-group">
      <input
        v-model="newTask2"
        @keyup.enter="addTask"
        placeholder="¿Qué hay que hacer?"
      />
      <button @click="addTask">Añadir</button>
    </div>

    <ul>
      <!-- volverlo componente -->
      <!-- <li v-for="(task, index) in tasks" :key="id">
        <span 
          :class="{ completed: task.completed}" 
          @click="task.completed = !task.completed"
        >
          {{ task.text }}
        </span>
        <button @click="deleteTask(task.id)" class="btn-eliminar">x</button> -->
      <!-- </li> -->

      <tasklList
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="changeTask"
        @edit="openEditModal"
        @delete="deleteTask"
      />
    </ul>

    <small>{{ tasks.length }} tareas en total</small>

    <EditTaskModal
      :isOpen="isEditModalOpen"
      :task="taskToEdit"
      @close="closeEditModal"
      @save="saveEditTask"
    />
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 400px;
  margin: 2rem auto;
  font-family: sans-serif;
}
.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  flex-grow: 1;
  padding: 8px;
}
ul {
  list-style: none;
  padding: 0;
}
</style>

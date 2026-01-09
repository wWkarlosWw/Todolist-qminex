<script setup>
import { ref } from "vue";
import tasklList from "./components/tasklList.vue";
import { useTask } from "./hooks/useTask";
import { useModal } from "./hooks/useModal";
import EditTaskModal from "./components/EditTaskModal.vue";

const {
  tasks,
  newTask2,
  addTask,
  deleteTask,
  changeTask,
  updateTask,
  getTaskById,
} = useTask();

const {
  isEditModalOpen,
  taskToEdit,
  editText,
  editCompleted,
  openEditModal,
  closeEditModal,
  getEditedData,
} = useModal();

const handleEdit = (id) => {
  const task = getTaskById(id);
  if (task) {
    openEditModal(task);
  }
};

const handleSave = () => {
  const editedData = getEditedData();

  if (editedData.text === "") {
    alert("El texto no puede estar vacío");
    return;
  }

  updateTask(editedData.id, editedData);
  closeEditModal();
};
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
        @edit="handleEdit"
        @delete="deleteTask"
      />
    </ul>

    <small>{{ tasks.length }} tareas en total</small>

    <EditTaskModal
      :isOpen="isEditModalOpen"
      :editText="editText"
      :editCompleted="editCompleted"
      @update:editText="editText = $event"
      @update:editCompleted="editCompleted = $event"
      @close="closeEditModal"
      @save="handleSave"
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

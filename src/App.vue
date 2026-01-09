<script setup>
import { ref } from "vue";
import tasklList from "./components/tasklList.vue";
import Modal from "./components/Modal.vue";
import { useTask } from "./hooks/useTask";
import { useModal } from "./hooks/useModal";

const { tasks, newTask, addTask, deleteTask, updateTask, toggleTask } =
  useTask();

const { isOpen, selectedData, opeModal, closeModal } = useModal();

const handleSave = () => {
  if (selectedData.value && selectedData.value.text.trim() !== "") {
    updateTask(selectedData.value.id, selectedData.value);
    closeModal();
  } else {
    alert("El texto no puede estar vacío");
  }
};
</script>

<template>
  <div class="todo-app">
    <h1>Mi Lista de Tareas</h1>

    <form class="input-group">
      <input v-model="newTask" placeholder="¿Qué hay que hacer?" />
      <button @click.prevent="addTask" type="submit" class="btn-save">
        Añadir
      </button>
    </form>

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
        @toggle="toggleTask"
        @edit="opeModal(task)"
        @delete="deleteTask"
      />
    </ul>

    <small>{{ tasks.length }} tareas en total</small>

    <!-- <EditTaskModal
      :isOpen="isEditModalOpen"
      :editText="editText"
      :editCompleted="editCompleted"
      @update:editText="editText = $event"
      @update:editCompleted="editCompleted = $event"
      @close="closeEditModal"
      @save="handleSave"
    /> -->

    <Modal :isOpen="isOpen" @close="closeModal" tagElement="form">
      <template #header>
        <h3>Editar Tarea</h3>
      </template>
      <div v-if="selectedData" class="cuestio">
        <label>Texto:</label>
        <input v-model="selectedData.text" type="text" class="edit-input" />

        <label>
          <input type="checkbox" v-model="selectedData.completed" />
          <p>Completada</p>
        </label>
      </div>

      <template #footer>
        <button @click="handleSave" class="btn-save">Guardar Cambios</button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 400px;
  margin: 2rem auto;
  font-family: sans-serif;
}

.todo-app h1 {
  text-align: center;
  margin: 16px;
  color: white;
}
.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  flex-grow: 1;
  border-radius: 16px;
  height: 40px;
  padding: 8px;
  font-size: 26px;
  text-align: center;
}

.btn-save {
  background: green;
  border: none;
  border-radius: 16px;
  width: 100px;
  height: 40px;
  color: white;
}
ul {
  list-style: none;
  padding: 0;
}
.cuestio {
  display: flex;
  flex-direction: column;
}
</style>

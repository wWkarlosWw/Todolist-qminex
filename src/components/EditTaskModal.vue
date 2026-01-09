<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  task: {
    type: Object,
    default: null,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "save"]);

const editText = ref("");
const editCompleted = ref(false);

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      editText.value = newTask.text;
      editCompleted.value = newTask.completed;
    }
  },
  { immediate: true }
);

const saveChanges = () => {
  if (editText.value.trim() === "") {
    alert("El texto no puede estar vacío");
    return;
  }

  emit("save", {
    id: props.task.id,
    text: editText.value.trim(),
    completed: editCompleted.value,
  });

  emit("close");
};

const closeModal = () => {
  emit("close");
};
</script>

<template>
  <div v-if="isOpen" class="modal" @click="closeModal">
    <div class="modal-box" @click.stop>
      <h3>Editar Tarea</h3>

      <label>
        Texto:
        <input v-model="editText" type="text" @keyup.enter="saveChanges" />
      </label>

      <label>
        <input v-model="editCompleted" type="checkbox" />
        Completada
      </label>

      <div class="buttons">
        <button @click="closeModal">Cancelar</button>
        <button @click="saveChanges">Guardar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-box {
  background: rgb(12, 12, 12);
  padding: 20px;
  border-radius: 8px;
  border: solid 2px white;
  width: 90%;
  max-width: 400px;
}

h3 {
  margin: 0 0 20px 0;
}

label {
  display: block;
  margin-bottom: 15px;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="checkbox"] {
  margin-right: 8px;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:first-child {
  background: #ddd;
}

button:first-child:hover {
  background: #ccc;
}

button:last-child {
  background: #4caf50;
  color: white;
}

button:last-child:hover {
  background: #45a049;
}
</style>

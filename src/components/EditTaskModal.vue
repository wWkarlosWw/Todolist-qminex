<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  editText: {
    type: String,
    default: "",
  },
  editCompleted: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "close",
  "save",
  "update:editText",
  "update:editCompleted",
]);

const saveChanges = () => {
  emit("save");
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
        <input
          :value="editText"
          @input="emit('update:editText', $event.target.value)"
          type="text"
          @keyup.enter="saveChanges"
        />
      </label>

      <label>
        <input
          :checked="editCompleted"
          @change="emit('update:editCompleted', $event.target.checked)"
          type="checkbox"
        />
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

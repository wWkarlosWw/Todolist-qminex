<script setup>
defineProps({ isOpen: Boolean, tagElement: String });
defineEmits(["close"]);
</script>

<template>
  <component
    :is="tagElement || 'div'"
    v-if="isOpen"
    class="modal"
    @click="$emit('close')"
  >
    <div class="modal-box" @click.stop>
      <header>
        <slot name="header"><h3>Título</h3></slot>
      </header>

      <section class="modal-body">
        <slot></slot>
      </section>

      <footer class="buttons">
        <button @click.prevent="$emit('close')" class="btn-cancel">
          Cancelar
        </button>
        <slot name="footer"></slot>
      </footer>
    </div>
  </component>
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

.btn-cancel {
  border-radius: 16px;
  width: 100px;
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

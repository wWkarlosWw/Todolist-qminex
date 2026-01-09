<script setup>
const props = defineProps({
  task: { type: Object, required: true },
});

const emit = defineEmits(["toggle", "delete", "edit"]);
</script>

<template>
  <li>
    <span
      :class="{ completed: task.completed }"
      @click="emit('toggle', task.id)"
    >
      {{ task.text }}
    </span>
    <button @click="emit('edit', task.id)" class="btn-editar">editar</button>
    <button @click="emit('delete', task.id)" class="btn-borrar">x</button>
  </li>
</template>

<style scoped>
li {
  display: flex;
  gap: 10px;
  padding: 10px;
  margin: 7px;
  border: 2px solid #bdbbbb;
  border-radius: 16px;
  align-items: center;
}

span {
  font-size: 20px;
  flex: 1;
  cursor: pointer;
  color: white;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

button {
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
}

.btn-borrar {
  background: red;
  border-radius: 3px;
  color: white;
  margin: 4px;
  padding: 2px 6px;
}

.btn-editar {
  background: rgb(0, 71, 0);
  border-radius: 3px;
  color: white;
  margin: 4px;
  padding: 2px 6px;
}
</style>

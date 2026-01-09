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
    <button @click="emit('edit', task.id)">editar</button>
    <button @click="emit('delete', task.id)">x</button>
  </li>
</template>

<style scoped>
li {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  align-items: center;
}

span {
  flex: 1;
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
}
</style>

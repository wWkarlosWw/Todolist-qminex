import { ref, watch } from "vue";

export function useModal() {
  const isEditModalOpen = ref(false);
  const taskToEdit = ref(null);
  const editText = ref("");
  const editCompleted = ref(false);

  watch(
    taskToEdit,
    (newTask) => {
      if (newTask) {
        editText.value = newTask.text;
        editCompleted.value = newTask.completed;
      }
    },
    { immediate: true }
  );

  const openEditModal = (task) => {
    taskToEdit.value = task;
    isEditModalOpen.value = true;
  };

  const closeEditModal = () => {
    isEditModalOpen.value = false;
    taskToEdit.value = null;
    editText.value = "";
    editCompleted.value = false;
  };

  const getEditedData = () => {
    return {
      id: taskToEdit.value?.id,
      text: editText.value.trim(),
      completed: editCompleted.value,
    };
  };

  return {
    isEditModalOpen,
    taskToEdit,
    editText,
    editCompleted,
    openEditModal,
    closeEditModal,
    getEditedData,
  };
}
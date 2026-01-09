import { ref, watch, onMounted } from "vue";

const TASK_KEY = "tasks"

export function useTask() {

  const newTask2 = ref("");
  const tasks = ref([]);

  const isEditModalOpen = ref(false);
  const taskToEdit = ref(null);

  watch(tasks, (newTasks) => {
    localStorage.setItem(TASK_KEY, JSON.stringify(newTasks));
  }, { deep: true }); 

  const addTask = () => {
    if (newTask2.value.trim() !== "") {
      tasks.value.push({
        id: Math.ceil(Math.random() * 1000000),
        text: newTask2.value,
        completed: false,
      });
      newTask2.value = "";
    }
  };

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  };

  const changeTask = (id) => {
    const task = tasks.value.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  };

  const openEditModal = (id) => {
    const task = tasks.value.find((t) => t.id === id);
    if (task) {
      taskToEdit.value = task;
      isEditModalOpen.value = true;
    }
  };

  const closeEditModal = () => {
    isEditModalOpen.value = false;
    taskToEdit.value = null;
  };

  const saveEditTask = (updatedData) => {
    const task = tasks.value.find((t) => t.id === updatedData.id);
    if (task) {
      task.text = updatedData.text;
      task.completed = updatedData.completed;
    }
  };

  onMounted(() => {
    const saved = localStorage.getItem(TASK_KEY);
    tasks.value = saved ? JSON.parse(saved) : [];
  })

  return {
    tasks,
    newTask2,
    addTask,
    deleteTask,
    changeTask,
    isEditModalOpen,
    taskToEdit,
    openEditModal,
    closeEditModal,
    saveEditTask
  };
}

// hoook solo para modal 
// slot ver y donde implementar y inetentat implementarlo 

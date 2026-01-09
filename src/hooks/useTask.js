import { ref, watch, onMounted } from "vue";

const TASK_KEY = "tasks"

export function useTask() {

  const tasks = ref([]);
  const newTask = ref("");

  watch(tasks, (newTasks) => {
    localStorage.setItem(TASK_KEY, JSON.stringify(newTasks));
  }, { deep: true }); 
  
  onMounted(() => {
    const saved = localStorage.getItem(TASK_KEY);
    tasks.value = saved ? JSON.parse(saved) : [];
  });

  const addTask = (e) => {
    // e.preventDefault()   no refrescar pagina
    if (newTask.value.trim() !== "") {
      tasks.value.push({
        id: Math.ceil(Math.random() * 1000000),
        text: newTask.value,
        completed: false,
      });
      newTask.value = "";
    }
  };

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  };

const updateTask = (id, updatedData) => {
    const index = tasks.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updatedData };
    }
  };

  const toggleTask = (id) => {
    const task = task.value.find((t) => t.id === id);
    if (task) task.completed = !task.completed;
  }


  return {
    tasks,
    newTask,
    addTask,
    deleteTask,
    updateTask,
    toggleTask
  };
}

// slot ver y donde implementar y inetentat implementarlo 

import { ref } from "vue";

export function useModal() {
  const isOpen = ref(false);
  const selectedData = ref(null)

  const opeModal = (data = null) => {
    selectedData.value = data ? { ...data } : null;
    isOpen.value = true
  };

  const closeModal = () => {
    isOpen.value = false;
    selectedData.value = null
  };
  

  return {
    isOpen,
    selectedData,
    opeModal,
    closeModal
  };
}
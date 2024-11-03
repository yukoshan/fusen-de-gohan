import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRecipiStore = defineStore('recipiStore', () => {
  const recipiList = ref([])
  return {
    recipiList
  };
}
,{
  persist: true,
}
)

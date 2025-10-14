import { ref } from 'vue'

const notifications = ref([])
let lastAddTime = 0

export function useNotification() {
  const addNotification = (message, type = 'success') => {
    const now = Date.now()
    if (now - lastAddTime < 3000) return //(3 segundo cooldown)
    lastAddTime = now

    const id = Date.now()
    notifications.value.push({ id, message, type })
    setTimeout(() => {
      removeNotification(id)
    }, 4000)
  }

  const removeNotification = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  return {
    notifications,
    addNotification,
    removeNotification
  }
}

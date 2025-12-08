<template>
  <aside
    :class="[
      'flex h-screen flex-col overflow-y-auto border-r bg-white transition-all duration-300',
      isExpanded ? 'w-64 px-5 py-8' : 'w-20 items-center py-8 px-2'
    ]"
  >
    <div :class="['flex items-center gap-x-3', isExpanded ? '' : 'justify-center']">
      <div class="bg-[#1C5E27] text-white p-2 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-fingerprint-icon lucide-fingerprint"
        >
          <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
          <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
          <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
          <path d="M2 12a10 10 0 0 1 18-6" />
          <path d="M2 16h.01" />
          <path d="M21.8 16c.2-2 .131-5.354 0-6" />
          <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
          <path d="M8.65 22c.21-.66.45-1.32.57-2" />
          <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
        </svg>
      </div>
      <span
        v-show="isExpanded"
        class="text-xm font-bold text-gray-800 transition-opacity duration-200 whitespace-nowrap"
      >
        Admin de Presenças
      </span>
    </div>

    <div class="mt-10 flex flex-1 flex-col justify-between">

      <nav :class="['-mx-3 space-y-3', isExpanded ? '' : 'flex flex-col items-center']">
        <router-link
          v-for="item in menuItems"
          :key="item.label"
          :to="item.to"
          :title="!isExpanded ? item.label : ''"
          :class="[
            'flex transform items-center rounded-lg px-3 py-3 text-gray-600 transition-colors duration-300 hover:bg-[#1C5E27] hover:text-white',
            isExpanded ? '' : 'justify-center'
          ]"
        >
          <component :is="item.icon" class="h-6 w-6" />
          <span
            v-show="isExpanded"
            class="mx-4 text-base font-medium whitespace-nowrap"
          >
            {{ item.label }}
          </span>
        </router-link>
      </nav>

      <div class="mt-6 border-t pt-4">

        <button
          @click="logout"
          :title="!isExpanded ? 'Sair' : ''"
          class="flex w-full items-center rounded-lg px-3 py-3 text-gray-600 hover:bg-red-600 hover:text-white transition-colors"
          :class="[isExpanded ? '' : 'justify-center']"
        >
          <LogOut class="h-6 w-6" />
          <span
            v-show="isExpanded"
            class="mx-4 text-base font-medium whitespace-nowrap"
          >
            Sair
          </span>
        </button>

        <div v-show="isExpanded" class="flex flex-col gap-3 mt-4 border-t pt-4">
          <h1 class="text-base font-semibold text-gray-700 whitespace-nowrap">
            {{ usuarioNome }}
          </h1>
        </div>

      </div>

    </div>
  </aside>
</template>

<script setup>
import { shallowRef, computed } from 'vue'
import { ClipboardCheck, List, BookCheck, LogOut } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

defineProps({
  isExpanded: { type: Boolean, required: true }
})

const menuItems = shallowRef([
  { to: '/registrar-presenca', label: 'Registrar Presença', icon: ClipboardCheck },
  { to: '/dashboard', label: 'Lista de Presenças', icon: List },
  { to: '/disciplinas', label: 'Gerenciar Disciplinas', icon: BookCheck }
])

const usuarioNome = computed(() => userStore.name ?? "Usuário")

function logout() {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.router-link-exact-active {
  background-color: #1c5e27;
  color: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.router-link-exact-active:hover {
  background-color: #154b1f;
  color: white;
}
</style>

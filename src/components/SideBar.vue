<template>
    <aside
        :class="['flex h-screen flex-col overflow-y-auto border-r bg-white transition-all duration-300', isExpanded ? 'w-64 px-5 py-8' : 'w-20 items-center py-8 px-2']">
        <div :class="['flex items-center gap-x-3', isExpanded ? '' : 'justify-center']">
            <div class="bg-[#1C5E27] p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10a8.03 8.03 0 015.657 5.657c1 2 2.657 2.657 2.657 2.657z" />
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.343 17.657A8 8 0 0117.657 9.343S17 11 15 12a8.03 8.03 0 01-5.657 5.657c-1 2-2.657 2.657-2.657 2.657z" />
                </svg>
            </div>
            <span v-show="isExpanded" class="text-xl font-bold text-gray-800 transition-opacity duration-200">Admin de
                Presenças</span>
        </div>

        <div class="mt-10 flex flex-1 flex-col justify-between">
            <nav :class="['-mx-3 space-y-3', isExpanded ? '' : 'flex flex-col items-center']">
                <router-link v-for="item in menuItems" :key="item.label" :to="item.to"
                    :class="['flex transform items-center rounded-lg px-3 py-3 text-gray-600 transition-colors duration-300 hover:bg-[#1C5E27] hover:text-white', isExpanded ? '' : 'justify-center']">
                    <component :is="item.icon" class="h-6 w-6" />
                    <span v-show="isExpanded" class="mx-4 text-base font-medium whitespace-nowrap">{{ item.label
                        }}</span>
                </router-link>
            </nav>

            <div class="mt-6 border-t pt-4">
                <div :class="['flex w-full items-center', isExpanded ? 'gap-x-3' : 'justify-center']">
                    <img class="h-12 w-12 rounded-full object-cover flex-shrink-0" :src="usuario.avatarUrl"
                        :alt="usuario.nome" />

                    <div v-show="isExpanded" class="flex flex-grow items-center justify-between">
                        <div class="transition-opacity duration-200">
                            <h1 class="text-base font-semibold text-gray-700 whitespace-nowrap">{{ usuario.nome }}</h1>
                            <p class="text-sm text-gray-500">{{ usuario.cargo }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
import { shallowRef } from 'vue';
import { ClipboardCheck, List, LogOut } from 'lucide-vue-next';

defineProps({
  isExpanded: {
    type: Boolean,
    required: true,
  }
});

const menuItems = shallowRef([
    { to: '/registrar-presenca', label: 'Registrar Presença', icon: ClipboardCheck },
    { to: '/dashboard', label: 'Lista de Presenças', icon: List },
    { to: '/login', label: 'Sair', icon: LogOut },
]);

const usuario = {
  nome: 'Ericlecio',
  cargo: 'Administrador',
  avatarUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQGO0jFnAufS3g/profile-displayphoto-shrink_200_200/B4DZdbRf0MGkAY-/0/1749583004054?e=2147483647&v=beta&t=2Znm62Yvxyf0vJ8VN2DSr3CpTg0QEtYDtvb-vfjQ3HE',
};
</script>


<style scoped>
.router-link-exact-active {
    background-color: #1C5E27;
    color: white;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.router-link-exact-active:hover {
    background-color: #154b1f;
    color: white;
}
</style>
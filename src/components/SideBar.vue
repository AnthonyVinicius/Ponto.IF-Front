<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const props = defineProps({
    isExpanded: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['toggle-sidebar']);

const usuarioLogado = ref({
    nome: "Alex Johnson",
    cargo: "Administrador",
    avatarUrl: "/src/img/ponto_if.png"
});

const navItems = ref([
    { name: 'Registrar Presença', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.16 6.571 6 8.243 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', to: '/registrar-presenca' },
    { name: 'Lista de Presença', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', to: '/lista-presenca' },
    { name: 'Gerenciar Alunos', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.875M16 10a4 4 0 10-8 0 4 4 0 008 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', to: '/gerenciar-alunos' },
    { name: 'Relatórios', icon: 'M16 8v8m-4-6v6m-4-6v6m-4-6v6', to: '/relatorios' },
]);

const route = useRoute();
const isActive = (path) => route.path === path;

const toggle = () => {
    emit('toggle-sidebar');
};
</script>

<template>
    <aside
        :class="props.isExpanded ? 'w-64' : 'w-20'" 
        class="bg-ponto-if-green text-white z-40 transition-all duration-300 shadow-xl flex flex-col"
    >
        <div class="p-4 flex justify-end">
            <button @click="toggle" class="p-2 rounded-full hover:bg-white/10 transition">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          :d="props.isExpanded ? 'M15 19l-7-7 7-7' : 'M4 6h16M4 12h16M4 18h16'"></path>
                </svg>
            </button>
        </div>

        <div class="px-4 py-2 mb-6">
            <h2 :class="props.isExpanded ? 'opacity-100' : 'opacity-0'" 
                class="text-xl font-bold transition-opacity duration-300 whitespace-nowrap overflow-hidden">
                Administração
            </h2>
        </div>

        <nav class="space-y-2 px-3 flex-1">
            <router-link
                v-for="item in navItems"
                :key="item.name"
                :to="item.to"
                :class="[
                    'flex items-center p-3 rounded-lg transition-colors duration-200',
                    isActive(item.to) ? 'bg-white/15 text-white' : 'hover:bg-white/5 text-gray-300'
                ]"
            >
                <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"></path>
                </svg>
                
                <span 
                    :class="props.isExpanded ? 'ml-3 opacity-100' : 'opacity-0 w-0'" 
                    class="font-medium transition-opacity duration-300 whitespace-nowrap overflow-hidden"
                >
                    {{ item.name }}
                </span>
            </router-link>
        </nav>

        <div 
            :class="props.isExpanded ? 'justify-start space-x-3' : 'justify-center space-x-0'"
            class="w-full p-4 bg-ponto-if-green/50 border-t border-white/20 flex items-center transition-all duration-300"
        >
            <img class="h-10 w-10 rounded-full object-cover flex-shrink-0" :src="usuarioLogado.avatarUrl" :alt="usuarioLogado.nome" />
            
            <div :class="props.isExpanded ? 'opacity-100' : 'opacity-0 w-0'" class="transition-opacity duration-300 overflow-hidden whitespace-nowrap">
                <p class="text-sm font-semibold text-white">{{ usuarioLogado.nome }}</p>
                <p class="text-xs text-gray-300">{{ usuarioLogado.cargo }}</p>
            </div>
        </div>
    </aside>
</template>

<style scoped>

.bg-ponto-if-green { 
    background-color: #1C5E27;
}

.router-link-exact-active {
    background-color: rgba(255, 255, 255, 0.20) !important;
    color: white !important;
}
</style>
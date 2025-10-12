<script setup>
import BaseLayout from '../components/BaseLayout.vue';
import BaseButton from '../components/BaseButton.vue';
import Filters from '../components/Filters.vue';
import Table from '../components/Table.vue';

import { ref, computed } from "vue";

const disciplinaAtual = ref('Projeto em computação');

const searchQuery = ref('');
const selectedDate = ref('');
const status = ref("All");
const statusOptions = ["All", "Presente", "Atrasado", "Faltou"];

const alunos = ref([
    { name: 'Anthony Vinicius de Brito Barros', hour: '19:30', date: '2025-10-10', status: 'Presente' },
    { name: 'Vinicíus José de Arruda', hour: '19:10', date: '2025-10-10', status: 'Presente' },
    { name: 'Luiz Gabriel Buarque Vasconcelos', hour: '19:40', date: '2025-10-10', status: 'Presente' },
    { name: 'Ericlecio Thiago Morais de Araujo', hour: '20:00', date: '2025-10-11', status: 'Atrasado' },
    { name: 'Maria Eduarda de Lima', hour: '--', date: '2025-10-11', status: 'Faltou' },
]);

const filteredAlunos = computed(() => {
    let aulasFiltradas = alunos.value;

    if (searchQuery.value) {
        aulasFiltradas = aulasFiltradas.filter(aluno =>
            aluno.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }
    if (status.value && status.value !== 'All') {
        aulasFiltradas = aulasFiltradas.filter(aluno =>
            aluno.status === status.value
        );
    }
    if (selectedDate.value) {
        aulasFiltradas = aulasFiltradas.filter(aluno =>
            aluno.date === selectedDate.value
        );
    }
    return aulasFiltradas;
});
</script>

<template>
    <BaseLayout>
        <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="topbar flex flex-wrap items-center justify-between gap-4">
                <div class="title">
                    <h1 class="text-xl font-bold text-gray-800" style="font-family: 'Roboto Slab', serif;">Lista de
                        Presença</h1>
                    <p class="text-sm text-gray-500">Todos os registros de presença</p>
                    <div class="mt-2">
                        <span
                            class="inline-flex items-center gap-x-1.5 rounded-full bg-[#1C5E27] px-3 py-1 text-xs font-medium text-white">
                            <svg class="h-1.5 w-1.5 fill-green-300" viewBox="0 0 6 6" aria-hidden="true">
                                <circle cx="3" cy="3" r="3" />
                            </svg>
                            {{ disciplinaAtual }}
                        </span>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <div class="relative">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <input v-model="searchQuery" type="text" placeholder="Pesquisar por aluno"
                            class="rounded-md border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>

                    <div class="relative">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
                            </svg>
                        </div>
                        <input v-model="selectedDate" type="date"
                            class="rounded-md border border-gray-200 bg-white py-1.5 pl-10 pr-2 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>

                    <Filters v-model="status" :options="statusOptions">
                        <template #icon>
                            <svg class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.572a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                            </svg>
                        </template>
                        Status: {{ status }}
                    </Filters>

                    <BaseButton>
                        <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Export CSV
                    </BaseButton>
                </div>
            </div>

            <div class="mt-6">
                <Table :alunos="filteredAlunos" />
            </div>
        </div>
    </BaseLayout>
</template>
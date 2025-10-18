<script setup>
import BaseLayout from "../components/BaseLayout.vue";
import BaseButton from "../components/BaseButton.vue";
import Filters from "../components/Filters.vue";
import Table from "../components/Table.vue";

import { ref, computed } from "vue";
import {
    Search,
    Calendar,
    Filter,
    Download,
    Circle,
} from "lucide-vue-next";

const disciplinaAtual = ref("Projeto em computação");

const searchQuery = ref("");
const selectedDate = ref("");
const status = ref("All");
const statusOptions = ["All", "Presente", "Atraso", "Falta"];

const alunos = ref([
    {
        name: "Anthony Vinicius de Brito Barros",
        hour: "19:30",
        date: "2025-10-10",
        status: "Presente",
    },
    {
        name: "Vinicíus José de Arruda",
        hour: "19:10",
        date: "2025-10-10",
        status: "Presente",
    },
    {
        name: "Luiz Gabriel Buarque Vasconcelos",
        hour: "19:40",
        date: "2025-10-10",
        status: "Presente",
    },
    {
        name: "Ericlecio Thiago Morais de Araujo",
        hour: "20:00",
        date: "2025-10-11",
        status: "Atraso",
    },
    { name: "Maria Eduarda de Lima", hour: "--", date: "2025-10-11", status: "Falta" },
    { name: "Vagner Alves Ferreira da Silva", hour: "20:18", date: "2025-10-18", status: "Falta" },
]);

const filteredAlunos = computed(() => {
    let aulasFiltradas = alunos.value;

    if (searchQuery.value) {
        aulasFiltradas = aulasFiltradas.filter((aluno) =>
            aluno.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }
    if (status.value && status.value !== "All") {
        aulasFiltradas = aulasFiltradas.filter(
            (aluno) => aluno.status === status.value
        );
    }
    if (selectedDate.value) {
        aulasFiltradas = aulasFiltradas.filter(
            (aluno) => aluno.date === selectedDate.value
        );
    }
    return aulasFiltradas;
});
</script>

<template>
    <BaseLayout>
        <div class="bg-white rounded-lg p-6 shadow-sm font-roboto">
            <div class="topbar flex flex-wrap items-center justify-between gap-4">
                <div class="title">
                    <h1 class="text-xl font-bold text-gray-800">Lista de Presença</h1>
                    <p class="text-sm text-gray-500">Todos os registros de presença</p>
                    <div class="mt-2">
                        <span
                            class="inline-flex items-center gap-x-1.5 rounded-full bg-[#1C5E27] px-3 py-1 text-xs font-medium text-white">
                            <Circle class="h-2 w-2 fill-green-300" />
                            {{ disciplinaAtual }}
                        </span>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <div class="relative">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search class="h-5 w-5 text-gray-400" />
                        </div>
                        <input v-model="searchQuery" type="text" placeholder="Pesquisar por aluno"
                            class="rounded-md border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>

                    <div class="relative">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Calendar class="h-5 w-5 text-gray-400" />
                        </div>
                        <input v-model="selectedDate" type="date"
                            class="rounded-md border border-gray-200 bg-white py-1.5 pl-10 pr-2 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                    </div>

                    <Filters v-model="status" :options="statusOptions">
                        <template #icon>
                            <Filter class="h-5 w-5 text-gray-500" />
                        </template>
                        Status: {{ status }}
                    </Filters>


                    <BaseButton>
                        <Download class="h-5 w-5 mr-2" />
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


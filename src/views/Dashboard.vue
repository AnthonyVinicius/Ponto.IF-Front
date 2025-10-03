<script setup>
import BaseLayout from '../components/BaseLayout.vue';
import BaseButton from '../components/BaseButton.vue';
import Filters from '../components/Filters.vue';
import SearchBar from '../components/SearchBar.vue';
import Table from '../components/Table.vue';

import { ref } from "vue";

const alunos = ref([
    { name: 'Anthony Vinicius de Brito Barros', hour: '19:30', date: '24-10-2025', status: 'Presente' },
    { name: 'Vinicíus José de Arruda', hour: '19:10', date: '24-10-2025', status: 'Presente' },
    { name: 'Luiz Gabriel Buarque Vasconcelos', hour: '19:40', date: '24-10-2025', status: 'Presente' },
]);
const status = ref("All");
const statusOptions = ["All", "Presente", "Atrasado", "Faltou"];
</script>

<template>
    <BaseLayout>
        <div class="dashboard bg-white rounded-md p-6 m-8 shadow-sm">
            <div class="topbar flex gap-4">
                <div class="title">
                    <h1 class="text-2xl font-bold text-ponto-if-green">Lista de Presença</h1>
                    <p>Todos os Registros de presença</p>
                </div>

                <div class="flex ms-auto gap-4">
                    <SearchBar></SearchBar>
                    <Filters>
                        <template #icon>
                            📅
                        </template>
                        Intervalo de datas
                    </Filters>

                    <Filters v-model="status" :options="statusOptions">
                        <template #icon>
                            ⚙️
                        </template>
                        Status: {{ status }}
                    </Filters>
                </div>
            </div>

            <Table :alunos="alunos"/>

                <div class="flex gap-4">
                    <BaseButton>Botão Padrão</BaseButton>
                    <BaseButton variant="outlined">Botão Contornado</BaseButton>
                </div>
        </div>
    </BaseLayout>
</template>


<style scoped></style>
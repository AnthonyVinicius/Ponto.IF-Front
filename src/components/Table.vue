<script setup>
import { ref } from 'vue';

const props = defineProps({
    alunos: {
        type: Array,
        required: true
    }
})
const titles = ref([
    "Nome",
    "Horario",
    "Data",
    "Status"
]);


</script>

<template>
    <table class="table-auto w-full border border-gray-300 m-3 shadow-sm">
        <thead>
            <tr>
                <th class="border border-gray-300 p-2" v-for="title in titles">
                    {{ title }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(aluno, index) in alunos" :key="index" >
                <td class=" p-3 ">{{ aluno.name }}</td>
                <td class=" p-3  text-center">{{ aluno.hour }}</td>
                <td class=" p-3 text-center">{{ aluno.date }}</td>
                <td class=" p-3 text-center">{{ aluno.status }}</td>
            </tr>
        </tbody>
    </table>
</template>
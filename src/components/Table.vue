<script setup>
import { ref } from "vue";
import StudentStatus from "./StudentStatus.vue";

const props = defineProps({
  alunos: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update-status"]);

const titles = ref(["Nome", "Horário", "Data", "Status"]);

function handleStatusChange(index, newStatus) {
  emit("update-status", { index, newStatus });
}
</script>

<template>
  <table class="table-auto w-full border border-gray-300 m-3 shadow-sm">
    <thead>
      <tr>
        <th v-for="title in titles" :key="title" class="border border-gray-300 p-2">
          {{ title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(aluno, index) in alunos" :key="index">
        <td @click="$emit('aluno-click', aluno.id)" class="p-3 cursor-pointer hover:text-indigo-800 transition">
          {{ aluno.name }}
          <svg xmlns="http://www.w3.org/2000/svg" class="inline ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </td>
        <td class="p-3 text-center">{{ aluno.hour }}</td>
        <td class="p-3 text-center">{{ aluno.date }}</td>
        <td class="p-3 text-center">
          <StudentStatus :status="aluno.status" @update="(status) => handleStatusChange(index, status)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
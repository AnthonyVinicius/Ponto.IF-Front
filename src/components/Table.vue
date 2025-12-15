<script setup>
import { ref } from "vue";
import StudentStatus from "./StudentStatus.vue";

defineProps({
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
  <div class="overflow-x-auto">
    <table
      class="hidden md:table table-auto w-full border border-gray-300 m-3 shadow-sm"
    >
      <thead class="bg-gray-100">
        <tr>
          <th
            v-for="title in titles"
            :key="title"
            class="border border-gray-300 p-2 text-gray-700"
          >
            {{ title }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(aluno, index) in alunos"
          :key="index"
          class="hover:bg-gray-50 transition"
        >
          <td class="p-3 font-medium text-gray-800">
            {{ aluno.name }}
          </td>

          <td class="p-3 text-center text-sm text-gray-600">
            {{ aluno.hour }}
          </td>

          <td class="p-3 text-center text-sm text-gray-600">
            {{ aluno.date }}
          </td>

          <td class="p-3 text-center">
            <StudentStatus
              :status="aluno.status"
              @update="(status) => handleStatusChange(index, status)"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="md:hidden space-y-4 px-3">
      <div
        v-for="(aluno, index) in alunos"
        :key="index"
        class="border border-gray-300 rounded-lg shadow-sm p-4 bg-white"
      >
        <p class="font-semibold text-gray-800">
          {{ aluno.name }}
        </p>

        <div class="mt-3 text-sm text-gray-700 space-y-1">
          <p>
            <span class="font-medium">Horário:</span> {{ aluno.hour }}
          </p>
          <p>
            <span class="font-medium">Data:</span> {{ aluno.date }}
          </p>

          <div class="mt-2">
            <StudentStatus
              :status="aluno.status"
              @update="(status) => handleStatusChange(index, status)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

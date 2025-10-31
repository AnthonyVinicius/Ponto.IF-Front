<template>
  <BaseLayout>
    <div class="bg-white rounded-lg p-6 shadow-sm font-roboto">
      <div class="flex items-center mb-6 border-b pb-4">
        <div>
          <h1 class="text-xl font-semibold text-gray-800">
            Gerenciar Disciplina: {{ disciplineInfo?.name || "Carregando..." }}
          </h1>
          <p class="text-sm text-gray-600">
            Curso: {{ disciplineInfo?.course?.name || "N/A" }} — Professor:
            {{ disciplineInfo?.teacher?.name || "N/A" }}
          </p>
        </div>

        <button
          @click="voltarPagina"
          class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md transition-colors ms-auto h-fit"
        >
          Voltar
        </button>
      </div>

      <div class="flex gap-8 mb-6">
        <FrequencyChart :percentage="disciplineInfo?.frequency || 0" />

        <div class="flex-1 border border-gray-200 p-4 rounded-md">
          <h2 class="text-base font-semibold text-[#1C5E27] mb-3">
            Resumo de Presença
          </h2>
          <table
            class="table-auto w-full border-collapse border border-gray-300 shadow-sm"
          >
            <thead class="bg-gray-100">
              <tr>
                <th class="border p-2">Presenças</th>
                <th class="border p-2">Ausências</th>
                <th class="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-gray-50 text-center">
                <td class="p-2">{{ disciplineInfo?.presences }}</td>
                <td class="p-2">{{ disciplineInfo?.absences }}</td>
                <td class="p-2">
                  {{ disciplineInfo?.presences + disciplineInfo?.absences }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="border border-gray-200 p-4 rounded-md mb-6">
        <h2 class="text-base font-semibold text-[#1C5E27] mb-3">
          Alunos Matriculados
        </h2>

        <table
          class="table-auto w-full border-collapse border border-gray-300 shadow-sm"
        >
          <thead class="bg-gray-100">
            <tr>
              <th class="border p-2">Nome</th>
              <th class="border p-2">Matrícula</th>
              <th class="border p-2">Curso</th>
              <th class="border p-2">Situação</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="student in disciplineInfo?.students"
              :key="student.id"
              class="hover:bg-gray-50 text-center"
            >
              <td class="p-2">{{ student.name }}</td>
              <td class="p-2">{{ student.registration }}</td>
              <td class="p-2">{{ student.course?.name }}</td>
              <td
                class="p-2 font-medium"
                :class="student.isPresent ? 'text-green-700' : 'text-red-700'"
              >
                {{ student.isPresent ? "Presente" : "Ausente" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import BaseLayout from "../components/BaseLayout.vue";
import FrequencyChart from "../components/FrequencyChart.vue";
// import CourseDAO from "../services/CourseDAO";

const router = useRouter();
const route = useRoute();
const disciplineInfo = ref(null);

async function loadDisciplineInfo() {
  try {
    // const id = route.params.id;
    // disciplineInfo.value = await CourseDAO.getById(id);
    disciplineInfo.value = {
      id: 1,
      name: "Algoritmos e Estruturas de Dados",
      frequency: 82,
      presences: 41,
      absences: 9,
      course: { name: "Engenharia de Software" },
      teacher: { name: "Prof. João Almeida" },
      students: [
        {
          id: 1,
          name: "Maria Silva",
          registration: "2023001",
          course: { name: "Engenharia de Software" },
          isPresent: true,
        },
        {
          id: 2,
          name: "Carlos Souza",
          registration: "2023002",
          course: { name: "Engenharia de Software" },
          isPresent: false,
        },
        {
          id: 3,
          name: "Ana Lima",
          registration: "2023003",
          course: { name: "Engenharia de Software" },
          isPresent: true,
        },
      ],
    };
  } catch (error) {
    console.error("Erro ao carregar dados da disciplina:", error);
  }
}

function voltarPagina() {
  router.go(-1);
}

onMounted(loadDisciplineInfo);
</script>

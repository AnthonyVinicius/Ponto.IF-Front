<template>
  <BaseLayout>
    <div class="bg-white rounded-lg p-6 shadow-sm font-roboto">

      <div class="flex flex-wrap items-center gap-4 mb-6 border-b pb-4">
        <div class="flex-1 min-w-[200px]">
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
          class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md transition-colors w-full sm:w-auto"
        >
          Voltar
        </button>
      </div>

      <div class="flex flex-wrap gap-6 mb-6">
        <div class="w-full md:w-auto flex justify-center md:block">
          <FrequencyChart :percentage="disciplineInfo?.frequency || 0" />
        </div>

        <div class="flex-1 border border-gray-200 p-4 rounded-md min-w-[250px]">
          <h2 class="text-base font-semibold text-[#1C5E27] mb-3">
            Resumo de Presença
          </h2>

          <div class="hidden md:block">
            <table class="table-auto w-full border-collapse border border-gray-300 shadow-sm">
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
                  <td class="p-2">{{ disciplineInfo?.presences + disciplineInfo?.absences }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="md:hidden space-y-2">
            <div class="border border-gray-300 rounded-md p-3">
              <p class="text-sm"><span class="font-medium">Presenças:</span> {{ disciplineInfo?.presences }}</p>
              <p class="text-sm"><span class="font-medium">Ausências:</span> {{ disciplineInfo?.absences }}</p>
              <p class="text-sm"><span class="font-medium">Total:</span> {{ disciplineInfo?.presences + disciplineInfo?.absences }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 p-4 rounded-md mb-6">
        <h2 class="text-base font-semibold text-[#1C5E27] mb-3">
          Alunos Matriculados
        </h2>

        <div class="hidden md:block">
          <table class="table-auto w-full border-collapse border border-gray-300 shadow-sm">
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

        <div class="md:hidden space-y-3">
          <div
            v-for="student in disciplineInfo?.students"
            :key="student.id"
            class="border border-gray-300 rounded-lg p-4 shadow-sm"
          >
            <p class="font-semibold text-gray-800">{{ student.name }}</p>
            <p class="text-sm text-gray-700"><span class="font-medium">Matrícula:</span> {{ student.registration }}</p>
            <p class="text-sm text-gray-700"><span class="font-medium">Curso:</span> {{ student.course?.name }}</p>
            <p
              class="mt-1 font-medium"
              :class="student.isPresent ? 'text-green-700' : 'text-red-700'"
            >
              {{ student.isPresent ? "Presente" : "Ausente" }}
            </p>
          </div>
        </div>
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

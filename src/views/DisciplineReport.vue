<template>
  <BaseLayout>
    <div class="flex gap-3 mb-4">
      <button
        @click="voltarPagina"
        class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path
            d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"
          />
        </svg>
        Voltar
      </button>
    </div>

    <div class="bg-white rounded-lg p-6 shadow-sm font-roboto">

      <!-- Header -->
      <div class="flex flex-wrap items-center gap-6 mb-8 border-b pb-4">
        <div class="flex-1 min-w-[200px]">
          <h1 class="text-xl font-semibold text-gray-800">
            Disciplina: {{ disciplineInfo?.name || "Carregando..." }}
          </h1>

          <p class="text-sm text-gray-600 mt-1">
            <span class="font-medium">Curso:</span>
            {{ disciplineInfo?.course?.name || "N/A" }} —
            <span class="font-medium">Professor:</span>
            {{ disciplineInfo?.teacher?.name || "N/A" }}
          </p>

          <p
            v-if="disciplineInfo?.term || disciplineInfo?.schedule"
            class="text-sm text-gray-600"
          >
            <span class="font-medium">Semestre:</span>
            {{ disciplineInfo.term }} —
            <span class="font-medium">Horário:</span>
            {{ disciplineInfo.schedule?.day }}
            ({{ disciplineInfo.schedule?.time }})
          </p>
        </div>

        <button
          @click="comecarAula"
          class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm"
        >
          Começar Aula
        </button>
      </div>

      <!-- Gráfico + Resumo -->
      <div class="flex flex-wrap gap-6 mb-8">
        <div class="w-full md:w-auto flex justify-center">
          <FrequencyChart :percentage="disciplineInfo?.frequency || 0" />
        </div>

        <div class="flex-1 border border-gray-200 rounded-lg p-4 min-w-[250px]">
          <h2 class="text-base font-semibold text-[#1C5E27] mb-4">
            Resumo de Presença
          </h2>

          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="bg-green-50 rounded-lg p-4">
              <p class="text-sm text-gray-600">Presenças</p>
              <p class="text-xl font-bold text-green-700">
                {{ disciplineInfo?.presences }}
              </p>
            </div>

            <div class="bg-red-50 rounded-lg p-4">
              <p class="text-sm text-gray-600">Ausências</p>
              <p class="text-xl font-bold text-red-700">
                {{ disciplineInfo?.absences }}
              </p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-sm text-gray-600">Total</p>
              <p class="text-xl font-bold text-gray-800">
                {{
                  (disciplineInfo?.presences || 0) +
                  (disciplineInfo?.absences || 0)
                }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Alunos -->
      <div class="border border-gray-200 rounded-lg p-4">
        <h2 class="text-base font-semibold text-[#1C5E27] mb-4">
          Alunos Matriculados
        </h2>

        <div v-if="loadingStudents" class="text-center py-6 text-gray-500">
          Carregando alunos...
        </div>

        <div v-else>
          <div class="rounded-lg border border-gray-200 overflow-hidden shadow-sm hidden md:block">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 text-gray-600">
                <tr>
                  <th class="px-4 py-3 text-left font-semibold">Aluno</th>
                  <th class="px-4 py-3 text-center font-semibold">Matrícula</th>
                  <th class="px-4 py-3 text-center font-semibold">Situação</th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="student in disciplineInfo?.students"
                  :key="student.id"
                  class="hover:bg-gray-50 transition"
                >
                  <td class="px-4 py-3">
                    <div class="font-medium text-gray-800">
                      {{ student.name }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ student.course }}
                    </div>
                  </td>

                  <td class="px-4 py-3 text-center font-mono text-gray-700">
                    {{ student.registration }}
                  </td>

                  <td class="px-4 py-3 text-center">
                    <span
                      class="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                      :class="
                        student.isPresent
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      "
                    >
                      {{ student.isPresent ? "Presente" : "Indefinido" }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="md:hidden space-y-3">
            <div
              v-for="student in disciplineInfo?.students"
              :key="student.id"
              class="border border-gray-200 rounded-lg p-4"
            >
              <p class="font-semibold text-gray-800">
                {{ student.name }}
              </p>
              <p class="text-xs text-gray-500 font-mono">
                {{ student.registration }}
              </p>
              <p class="text-sm mt-2">
                <span
                  class="inline-flex rounded-full px-2 py-1 text-xs font-semibold"
                  :class="
                    student.isPresent
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  "
                >
                  {{ student.isPresent ? "Presente" : "Indefinido" }}
                </span>
              </p>
            </div>
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

import ClassSessionDAO from "../services/ClassSessionDAO";
import EnrollmentDAO from "../services/EnrollmentDAO";
import StudentDAO from "../services/StudentDAO";
import SubjectDAO from "../services/SubjectDAO";
import OfferingDAO from "../services/SubjectOfferingDAO";
import CourseDAO from "../services/CourseDAO";
import TeacherDAO from "../services/TeacherDAO";

const router = useRouter();
const route = useRoute();

const loadingStudents = ref(true);
const teacherId = localStorage.getItem("user-id");

const disciplineInfo = ref({
  name: "",
  term: "",
  schedule: { day: "", time: "" },
  course: { name: "" },
  teacher: { name: "" },
  students: [],
  presences: 0,
  absences: 0,
  frequency: 0,
});

async function loadDisciplineInfo() {
  try {
    loadingStudents.value = true;
    const offeringId = route.params.offeringId;

    const offering = await OfferingDAO.getById(offeringId);

    const [subject, course, teacher, enrollments] = await Promise.all([
      SubjectDAO.getById(offering.subjectId),
      offering.courseId
        ? CourseDAO.getById(offering.courseId)
        : Promise.resolve({ name: "Curso não encontrado" }),
      offering.teacherId
        ? TeacherDAO.getById(offering.teacherId)
        : Promise.resolve({ name: "Professor não encontrado" }),
      EnrollmentDAO.getStudentsByOffering(offeringId),
    ]);

    const students = await Promise.all(
      enrollments.map(async (e) => {
        try {
          const s = await StudentDAO.getById(e.studentId);
          return {
            id: s.id,
            name: s.name,
            registration: s.registration,
            course: s.course?.name ?? "Sem curso",
            isPresent: false,
          };
        } catch {
          return null;
        }
      })
    );

    disciplineInfo.value = {
      name: subject.name,
      term: offering.term,
      schedule: offering.schedule,
      course,
      teacher,
      presences: 0,
      absences: 0,
      frequency: 0,
      students: students.filter(Boolean),
    };
  } catch (error) {
    console.error("Erro ao carregar disciplina:", error);
    alert("Erro ao carregar dados da disciplina.");
  } finally {
    loadingStudents.value = false;
  }
}

async function comecarAula() {
  try {
    const offeringId = route.params.offeringId;

    await SubjectDAO.startOffering(offeringId, teacherId);

    alert("Aula iniciada com sucesso!");

    router.push({
      name: "Dashboard",
      params: { offeringId },
    });
    
  } catch (error) {
    console.error(error);
    alert("Erro ao iniciar a aula.");
  }
}

function voltarPagina() {
  router.go(-1);
}

onMounted(loadDisciplineInfo);
</script>

<template>
  <BaseLayout>
    <div class="flex gap-3 mb-4">
      <button
        @click="voltarPagina"
        class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-arrow-big-left"
        >
          <path
            d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"
          />
        </svg>
        <span>Voltar</span>
      </button>
    </div>

    <div class="bg-white rounded-lg p-6 shadow-sm font-roboto">
      <div class="flex flex-wrap items-center gap-4 mb-6 border-b pb-4">
        <div class="flex-1 min-w-[200px]">
          <h1 class="text-xl font-semibold text-gray-800">
            Disciplina: {{ disciplineInfo?.name || "Carregando..." }}
          </h1>

          <div class="text-sm text-gray-600 mt-1 space-y-1">
            <p>
              <span class="font-medium">Curso:</span> {{ disciplineInfo?.course?.name || "N/A" }} — 
              <span class="font-medium">Professor:</span> {{ disciplineInfo?.teacher?.name || "N/A" }}
            </p>
            <p v-if="disciplineInfo?.term || disciplineInfo?.schedule">
              <span class="font-medium">Semestre:</span> {{ disciplineInfo.term }} — 
              <span class="font-medium">Horário:</span> {{ disciplineInfo.schedule?.day }} ({{ disciplineInfo.schedule?.time }})
            </p>
          </div>
        </div>

        <button
          @click="comecarAula"
          class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm"
        >
          Começar Aula
        </button>
      </div>

      <div class="flex flex-wrap gap-6 mb-6">
        <div class="w-full md:w-auto flex justify-center md:block">
          <FrequencyChart :percentage="disciplineInfo?.frequency || 0" />
        </div>

        <div class="flex-1 border border-gray-200 p-4 rounded-md min-w-[250px]">
          <h2 class="text-base font-semibold text-[#1C5E27] mb-3">Resumo de Presença</h2>

          <div class="hidden md:block">
            <table class="table-auto w-full border-collapse border border-gray-300 shadow-sm">
              <thead class="bg-gray-100">
                <tr>
                  <th class="border p-2 text-gray-700">Presenças</th>
                  <th class="border p-2 text-gray-700">Ausências</th>
                  <th class="border p-2 text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-gray-50 text-center">
                  <td class="p-2 text-green-700 font-medium">{{ disciplineInfo?.presences }}</td>
                  <td class="p-2 text-red-700 font-medium">{{ disciplineInfo?.absences }}</td>
                  <td class="p-2 font-bold">{{ (disciplineInfo?.presences || 0) + (disciplineInfo?.absences || 0) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="md:hidden space-y-2">
            <div class="border border-gray-300 rounded-md p-3 bg-gray-50">
              <p class="text-sm flex justify-between"><span class="font-medium">Presenças:</span> {{ disciplineInfo?.presences }}</p>
              <p class="text-sm flex justify-between"><span class="font-medium">Ausências:</span> {{ disciplineInfo?.absences }}</p>
              <hr class="my-2 border-gray-300">
              <p class="text-sm flex justify-between"><span class="font-bold">Total:</span> {{ (disciplineInfo?.presences || 0) + (disciplineInfo?.absences || 0) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 p-4 rounded-md mb-6">
        <h2 class="text-base font-semibold text-[#1C5E27] mb-3">Alunos Matriculados</h2>

        <div v-if="loadingStudents" class="text-center py-4 text-gray-500">
          Carregando alunos...
        </div>

        <div v-else>
          <div class="hidden md:block">
            <table class="table-auto w-full border-collapse border border-gray-300 shadow-sm">
              <thead class="bg-gray-100">
                <tr>
                  <th class="border p-2 text-left text-gray-700">Nome</th>
                  <th class="border p-2 text-center text-gray-700">Matrícula</th>
                  <th class="border p-2 text-center text-gray-700">Situação Atual</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="student in disciplineInfo?.students"
                  :key="student.id"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="p-2">{{ student.name }}</td>
                  <td class="p-2 text-center font-mono text-sm">{{ student.registration }}</td>
                  <td
                    class="p-2 text-center font-medium"
                    :class="student.isPresent ? 'text-green-700' : 'text-gray-500'"
                  >
                    {{ student.isPresent ? "Presente" : "Indefinido" }}
                  </td>
                </tr>
                <tr v-if="disciplineInfo?.students?.length === 0">
                  <td colspan="4" class="p-4 text-center text-gray-500">Nenhum aluno matriculado.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="md:hidden space-y-3">
            <div
              v-for="student in disciplineInfo?.students"
              :key="student.id"
              class="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-semibold text-gray-800">{{ student.name }}</p>
                  <p class="text-xs text-gray-500 font-mono">{{ student.registration }}</p>
                </div>
                <span 
                  class="text-xs px-2 py-1 rounded-full font-medium"
                  :class="student.isPresent ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'"
                >
                  {{ student.isPresent ? "Presente" : "-" }}
                </span>
              </div>
              <p class="text-sm text-gray-700 mt-2"><span class="font-medium">Curso:</span> {{ student.course }}</p>
            </div>
             <p v-if="disciplineInfo?.students?.length === 0" class="text-center text-gray-500">Nenhum aluno matriculado.</p>
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
  frequency: 0
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
      EnrollmentDAO.getStudentsByOffering(offeringId)
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
            isPresent: false
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
      students: students.filter(Boolean)
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

    const classSession = await ClassSessionDAO.getByOffering(offeringId);

    alert("Aula iniciada com sucesso!");

    router.push({
      name: "Dashboard",
      params: { classSessionId: classSession.id }
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


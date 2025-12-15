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

      <div class="flex flex-wrap items-center gap-6 mb-8 border-b pb-4">
        <div class="flex-1 min-w-[200px]">
          <h1 class="text-xl font-semibold text-gray-800">
            Disciplina: {{ disciplineInfo.name }}
          </h1>

          <p class="text-sm text-gray-600 mt-1">
            <span class="font-medium">Curso:</span>
            {{ disciplineInfo.course.name }} —
            <span class="font-medium">Professor:</span>
            {{ disciplineInfo.teacher.name }}
          </p>

          <p class="text-sm text-gray-600">
            <span class="font-medium">Semestre:</span>
            {{ disciplineInfo.term }} —
            <span class="font-medium">Horário:</span>
            {{ disciplineInfo.schedule.day }} ({{ disciplineInfo.schedule.time }})
          </p>
        </div>

        <button
          @click="comecarAula"
          class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md transition-colors shadow-sm"
        >
          Começar Aula
        </button>
      </div>

      <div class="flex flex-wrap gap-6 mb-8">
        <div class="w-full md:w-auto flex justify-center">
          <FrequencyChart :percentage="disciplineInfo.frequency" />
        </div>

        <div class="flex-1 border border-gray-200 rounded-lg p-4 min-w-[250px]">
          <h2 class="text-base font-semibold text-[#1C5E27] mb-4">
            Resumo de Presença
          </h2>

          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="bg-green-50 rounded-lg p-4">
              <p class="text-sm text-gray-600">Presenças</p>
              <p class="text-xl font-bold text-green-700">
                {{ disciplineInfo.presences }}
              </p>
            </div>

            <div class="bg-red-50 rounded-lg p-4">
              <p class="text-sm text-gray-600">Ausências</p>
              <p class="text-xl font-bold text-red-700">
                {{ disciplineInfo.absences }}
              </p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-sm text-gray-600">Total</p>
              <p class="text-xl font-bold text-gray-800">
                {{ disciplineInfo.presences + disciplineInfo.absences }}
              </p>
            </div>
          </div>
        </div>
      </div>

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
                  <th class="px-4 py-3 text-center font-semibold">Presenças</th>
                  <th class="px-4 py-3 text-center font-semibold">Faltas</th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="student in disciplineInfo.students"
                  :key="student.studentId"
                  class="hover:bg-gray-50 transition"
                >
                  <td class="px-4 py-3 font-medium text-gray-800">
                    {{ student.studentName }}
                  </td>

                  <td class="px-4 py-3 text-center font-mono text-gray-700">
                    {{ student.registration }}
                  </td>

                  <td class="px-4 py-3 text-center text-green-700 font-semibold">
                    {{ student.presents }}
                  </td>

                  <td class="px-4 py-3 text-center text-red-700 font-semibold">
                    {{ student.absents }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import BaseLayout from "../components/BaseLayout.vue";
import FrequencyChart from "../components/FrequencyChart.vue";

import AttendanceDAO from "../services/AttendanceDAO";
import SubjectOfferingDAO from "../services/SubjectOfferingDAO";
import SubjectDAO from "../services/SubjectDAO";
import CourseDAO from "../services/CourseDAO";
import TeacherDAO from "../services/TeacherDAO";

const route = useRoute();
const router = useRouter();
const teacherId = localStorage.getItem("user-id");

const loadingStudents = ref(true);

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
  loadingStudents.value = true;

  const offeringId = route.params.offeringId;

  const offering = await SubjectOfferingDAO.getById(offeringId);

  const [subject, course, teacher, report] = await Promise.all([
    SubjectDAO.getById(offering.subjectId),
    CourseDAO.getById(offering.courseId),
    TeacherDAO.getById(offering.teacherId),
    AttendanceDAO.getReportByOffering(offeringId)
  ]);

  const presences = report.reduce((s, r) => s + r.presents, 0);
  const absences = report.reduce((s, r) => s + r.absents, 0);

  const totalPossible =
    report.length > 0
      ? report[0].totalSessions * report.length
      : 0;

  const frequency =
    totalPossible > 0
      ? Math.round((presences / totalPossible) * 100)
      : 0;

  disciplineInfo.value = {
    name: subject.name,
    term: offering.term,
    schedule: offering.schedule,
    course,
    teacher,
    students: report,
    presences,
    absences,
    frequency
  };

  loadingStudents.value = false;
}

async function comecarAula() {
  await SubjectDAO.startOffering(route.params.offeringId, teacherId);
  router.push({ name: "Dashboard" });
}

function voltarPagina() {
  router.go(-1);
}

onMounted(loadDisciplineInfo);
</script>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Search, Download } from "lucide-vue-next";

import BaseLayout from "../components/BaseLayout.vue";

import TeacherDAO from "../services/TeacherDAO";
import SubjectDAO from "../services/SubjectDAO";
import ClassroomDAO from "../services/ClassroomDAO";
import EnrollmentDAO from "../services/EnrollmentDAO";
import StudentDAO from "../services/StudentDAO";
import ClassSessionDAO from "../services/ClassSessionDAO";

const router = useRouter();

const offerings = ref([]);
const searchQuery = ref("");
const activeOfferings = ref([]);

const teacherId = localStorage.getItem("user-id");

/* ==============================
   CARREGAR DISCIPLINAS
================================ */
async function loadOfferings() {
  try {
    const data = await TeacherDAO.getOfferings(teacherId);

    const enriched = await Promise.all(
      data.map(async (offer) => {
        const subject = await SubjectDAO.getById(offer.subjectId);
        const classroom = await ClassroomDAO.getById(offer.classroomId);

        let timeStart = "";
        let timeEnd = "";

        if (offer.schedule?.time) {
          const parts = offer.schedule.time.split(" - ");
          timeStart = parts[0] || "";
          timeEnd = parts[1] || "";
        }

        const enrollments = await EnrollmentDAO.getStudentsByOffering(offer.id);

        const students = await Promise.all(
          enrollments.map(async (e) => {
            const student = await StudentDAO.getById(e.studentId);
            return {
              id: student.id,
              nome: student.name,
              matricula: student.registration,
              curso: student.course?.name ?? "Sem curso",
              presencas: 0,
              ausencias: 0,
            };
          })
        );

        return {
          ...offer,
          subjectName: subject?.name ?? "Sem título",
          classroomName: classroom?.name ?? "Sala não encontrada",
          classroomLocation: classroom?.location ?? "N/A",
          timeStart,
          timeEnd,
          students,
        };
      })
    );

    offerings.value = enriched;
  } catch (error) {
    console.error("Erro ao carregar disciplinas:", error);
  }
}

/* ==============================
   CARREGAR AULAS ATIVAS
================================ */
async function loadActiveSessions() {
  try {
    const sessions = await ClassSessionDAO.getAllActive();

    activeOfferings.value = sessions
      .filter((session) => session.sessionEnd === null)
      .map((session) => session.offeringId);
  } catch (err) {
    console.error("Erro ao carregar aulas ativas:", err);
  }
}

/* ==============================
   HELPERS
================================ */
function isActiveSession(offeringId) {
  return activeOfferings.value.includes(offeringId);
}

function goToDashboard(offeringId) {
  router.push(`/dashboard/${offeringId}`);
}

function goToDisciplineReport(offeringId) {
  router.push(`/disciplinas/${offeringId}/gerenciar`);
}

/* ==============================
   FILTRO
================================ */
const filteredOfferings = computed(() =>
  offerings.value.filter((o) =>
    o.subjectName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

onMounted(async () => {
  await loadOfferings();
  await loadActiveSessions();
});
</script>

<template>
  <BaseLayout>
    <div class="bg-white p-4">
      <div class="topbar flex flex-wrap items-center justify-between gap-4 m-3">
        <div>
          <h1 class="text-lg font-semibold text-gray-800">
            Gerenciamento de Disciplinas
          </h1>
          <p class="text-sm text-gray-600">
            Selecione uma disciplina para visualizar e gerenciar os alunos
          </p>
        </div>

        <div class="flex gap-3 items-center">
          <div class="relative min-w-[200px]">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Pesquisar disciplina"
              class="rounded-md border border-gray-200 py-2 pl-10 pr-4 text-sm shadow-sm w-full"
            />
          </div>

          <button
            class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Download class="h-5 w-5" />
            Exportar CSV
          </button>
        </div>
      </div>

      <div
        v-if="filteredOfferings.length === 0"
        class="text-center text-gray-500 p-6"
      >
        Nenhuma disciplina encontrada ainda.
      </div>

      <div
        v-for="offer in filteredOfferings"
        :key="offer.id"
        class="border border-gray-200 p-4 rounded-md m-3 hover:bg-gray-50 transition"
      >
        <div class="flex items-center gap-2 mb-2">
          <h2
            class="text-base font-semibold text-[#1C5E27] underline hover:text-green-800 cursor-pointer"
            @click="goToDisciplineReport(offer.id)"
          >
            {{ offer.subjectName }}
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-right-icon lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <button
            v-if="isActiveSession(offer.id)"
            @click.stop="goToDashboard(offer.id)"
            class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-2 py-1 rounded-md flex items-center ms-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-circle-play-icon lucide-circle-play"
            >
              <path
                d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"
              />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span class="ms-1"> Aula ativa</span>
          </button>
        </div>

        <div class="flex gap-4 text-sm text-gray-600">
          <span>{{ offer.classroomName }}</span>
          <span>{{ offer.timeStart }} - {{ offer.timeEnd }}</span>
        </div>

        <div class="hidden md:block mt-4">
          <table class="table-auto w-full border border-gray-300 shadow-sm">
            <thead>
              <tr>
                <th class="border p-2">Aluno</th>
                <th class="border p-2">Matrícula</th>
                <th class="border p-2">Presenças</th>
                <th class="border p-2">Ausências</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="aluno in offer.students"
                :key="aluno.id"
                class="hover:bg-gray-50"
              >
                <td class="p-2 text-center">{{ aluno.nome }}</td>
                <td class="p-2 text-center">{{ aluno.matricula }}</td>
                <td class="p-2 text-center">{{ aluno.presencas }}</td>
                <td class="p-2 text-center">{{ aluno.ausencias }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

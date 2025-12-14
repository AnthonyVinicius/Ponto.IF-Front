<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { Search, Filter, Circle } from "lucide-vue-next";

import BaseLayout from "../components/BaseLayout.vue";
import Filters from "../components/Filters.vue";
import Table from "../components/Table.vue";
import FrequencyChart from "../components/FrequencyChart.vue";

import TeacherDAO from "../services/TeacherDAO";
import SubjectDAO from "../services/SubjectDAO";
import EnrollmentDAO from "../services/EnrollmentDAO";
import StudentDAO from "../services/StudentDAO";
import ClassSessionDAO from "../services/ClassSessionDAO";
import AttendanceDAO from "../services/AttendanceDAO";

const route = useRoute();
const router = useRouter();

const offeringId = Number(route.params.offeringId);
const teacherId = localStorage.getItem("user-id");

const disciplinaAtual = ref("Carregando...");
const students = ref([]);
const classSession = ref(null);

const searchQuery = ref("");
const status = ref("All");
const statusOptions = ["All", "Presente", "Atraso", "Falta"];

const isLoading = ref(false);
const errorMessage = ref("");

function goToUserDashboard(studentId) {
  router.push(`/dashboard/${studentId}/user`);
}

function registrarPresenca() {
  if (!classSession.value?.id) {
    alert("Sessão da aula não encontrada.");
    return;
  }

  router.push({
    path: "/registrar-presenca",
    query: {
      classSessionId: Number(classSession.value.id),
      offeringId
    }
  });
}

async function loadClassSession() {
  try {
    classSession.value = await ClassSessionDAO.getByOffering(offeringId);
  } catch (err) {
    console.error(err);
    errorMessage.value = "Erro ao carregar sessão da aula.";
  }
}

async function loadOfferingData() {
  try {
    isLoading.value = true;

    const offerings = await TeacherDAO.getOfferings(teacherId);
    const offer = offerings.find(o => o.id === offeringId);

    if (!offer) {
      errorMessage.value = "Disciplina não encontrada.";
      return;
    }

    const subject = await SubjectDAO.getById(offer.subjectId);
    disciplinaAtual.value = subject?.name ?? "Sem título";

    const enrollments = await EnrollmentDAO.getStudentsByOffering(offer.id);

    const list = await Promise.all(
      enrollments.map(async e => {
        const st = await StudentDAO.getById(e.studentId);

        return {
          id: st.id,
          name: st.name,
          registration: st.registration,
          course: st.course?.name ?? "Sem curso",
          status: "Atraso",
          hour: "--:--",
          date: "--/--/----",
          presencas: 0,
          ausencias: 0
        };
      })
    );

    students.value = list;

  } catch (err) {
    console.error(err);
    errorMessage.value = "Erro ao carregar dados da disciplina.";
  } finally {
    isLoading.value = false;
  }
}

async function loadAttendances() {
  try {
    const attendances = await AttendanceDAO.getByOffering(offeringId);
    if (!attendances || attendances.length === 0) return;

    const attendanceMap = new Map();

    attendances.forEach(a => {
      const dateObj = new Date(a.recordedAt);

      const date = dateObj.toLocaleDateString("pt-BR");
      const hour = dateObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      });

      attendanceMap.set(a.studentId, {
        status: a.status,
        date,
        hour
      });
    });

    students.value = students.value.map(student => {
      const attendance = attendanceMap.get(student.id);

      if (!attendance) return student;

      return {
        ...student,
        status:
          attendance.status === "PRESENT"
            ? "Presente"
            : attendance.status === "ABSENT"
              ? "Falta"
              : "Atraso",
        date: attendance.date,
        hour: attendance.hour
      };
    });

  } catch (err) {
    console.error("Erro ao carregar presenças:", err);
  }
}

async function finalizarAula() {
  try {
    await SubjectDAO.finalizeOffering(offeringId, teacherId);
    alert("Aula finalizada com sucesso!");
    router.push("/disciplinas");
  } catch (error) {
    console.error(error);
    alert("Erro ao finalizar a aula.");
  }
}

const filteredStudents = computed(() => {
  let list = [...students.value];

  if (searchQuery.value) {
    list = list.filter(s =>
      s.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (status.value !== "All") {
    list = list.filter(s => s.status === status.value);
  }

  return list;
});

const totalStudents = computed(() => filteredStudents.value.length);

const frequenciaPercent = computed(() => {
  if (students.value.length === 0) return 0;
  const presentes = students.value.filter(
    s => s.status === "Presente"
  ).length;
  return Math.round((presentes / students.value.length) * 100);
});

onMounted(async () => {
  await loadClassSession();
  await loadOfferingData();
  await loadAttendances();
});
</script>


<template>
  <BaseLayout>
    <div class="bg-white rounded-lg p-6 shadow-sm font-roboto">
      <div class="topbar flex flex-wrap items-center justify-between gap-6">

        <div class="my-6 max-w-md w-full flex justify-center sm:justify-start">
          <FrequencyChart
            :percentage="frequenciaPercent"
            class="border border-gray-200 w-full max-w-[260px]"
          />
        </div>

        <div class="title w-full sm:w-auto">
          <h1 class="text-xl font-bold text-gray-800">Lista de Presença</h1>
          <p class="text-sm text-gray-500">Alunos cadastrados na disciplina</p>

          <div class="mt-2">
            <span
              class="inline-flex items-center gap-x-1.5 rounded-full bg-[#1C5E27] px-3 py-1 text-xs font-medium text-white"
            >
              <Circle class="h-2 w-2 fill-green-300" />
              {{ disciplinaAtual }}
            </span>
          </div>
        </div>

        <div class="flex flex-wrap w-full sm:w-auto items-center gap-3">

          <div class="relative w-full sm:w-auto">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Pesquisar por aluno"
              class="rounded-md border border-gray-200 py-2 pl-10 pr-4 text-sm shadow-sm w-full sm:w-auto"
            />
          </div>

          <Filters v-model="status" :options="statusOptions">
            <template #icon>
              <Filter class="h-5 w-5 text-gray-500" />
            </template>
            Status: {{ status }}
          </Filters>

          <button
            @click="registrarPresenca"
            class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md transition-colors w-full sm:w-auto"
          >
            Registrar Presença
          </button>

          <button
            @click="finalizarAula"
            class="bg-red-700 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-md transition-colors w-full sm:w-auto"
          >
            Finalizar Aula
          </button>

        </div>
      </div>

      <div class="mt-6">
        <div v-if="isLoading" class="text-gray-500 text-center py-8">
          Carregando estudantes...
        </div>

        <div v-else-if="errorMessage" class="text-red-500 text-center py-8">
          {{ errorMessage }}
        </div>

        <div v-else>
          <Table :alunos="filteredStudents" @aluno-click="goToUserDashboard" />
          <p class="text-sm text-gray-500 mt-4">
            Total de estudantes: {{ totalStudents }}
          </p>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

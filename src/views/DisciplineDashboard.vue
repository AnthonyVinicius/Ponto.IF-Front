<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Search, Filter, Circle } from "lucide-vue-next";
import { useNotification } from "../composables/useNotification";

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

const presentesRegistrados = ref(new Set());
const alunosPersistidos = ref(new Set());

const searchQuery = ref("");
const status = ref("All");
const statusOptions = ["All", "Presente", "Atraso", "Falta"];

const isLoading = ref(false);
const errorMessage = ref("");

const { addNotification } = useNotification();

function goToUserDashboard(studentId) {
  router.push(`/dashboard/${studentId}/user`);
}

function registrarPresenca() {
  if (!classSession.value?.id) return;

  router.push({
    path: "/registrar-presenca",
    query: {
      classSessionId: Number(classSession.value.id),
      offeringId,
    },
  });
}

async function loadClassSession() {
  classSession.value = await ClassSessionDAO.getByOffering(offeringId);
}

async function loadOfferingData() {
  try {
    isLoading.value = true;

    const offerings = await TeacherDAO.getOfferings(teacherId);
    const offer = offerings.find((o) => o.id === offeringId);
    if (!offer) return;

    const subject = await SubjectDAO.getById(offer.subjectId);
    disciplinaAtual.value = subject?.name ?? "Sem título";

    const enrollments = await EnrollmentDAO.getStudentsByOffering(offer.id);

    const list = await Promise.all(
      enrollments.map(async (e) => {
        const st = await StudentDAO.getById(e.studentId);
        return {
          id: st.id,
          name: st.name,
          registration: st.registration,
          course: st.course?.name ?? "Sem curso",
          status: "Atraso",
          hour: "--:--",
          date: "--/--/----",
        };
      })
    );

    students.value = list;
  } finally {
    isLoading.value = false;
  }
}

async function loadAttendances() {
  const attendances = await AttendanceDAO.getBySession(classSession.value.id);
  if (!Array.isArray(attendances)) return;

  presentesRegistrados.value.clear();
  alunosPersistidos.value.clear();

  const attendanceMap = new Map();

  attendances.forEach((a) => {
    alunosPersistidos.value.add(a.studentId);

    if (a.status === "PRESENT") {
      presentesRegistrados.value.add(a.studentId);
    }

    const dateObj = new Date(a.recordedAt);

    attendanceMap.set(a.studentId, {
      status: a.status,
      date: dateObj.toLocaleDateString("pt-BR"),
      hour: dateObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  });

  students.value = students.value.map((student) => {
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
      hour: attendance.hour,
    };
  });
}

async function updateAttendanceStatus({ index, newStatus }) {
  const filteredStudent = filteredStudents.value[index];
  if (!filteredStudent || !classSession.value?.id) return;

  const student = students.value.find((s) => s.id === filteredStudent.id);
  if (!student) return;

  student.status = newStatus;
  student.hour = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  student.date = new Date().toLocaleDateString("pt-BR");

  if (newStatus !== "Presente") return;
  if (alunosPersistidos.value.has(student.id)) return;

  await AttendanceDAO.insert({
    sessionId: classSession.value.id,
    studentId: student.id,
    status: "PRESENT",
    offeringId,
  });

  presentesRegistrados.value.add(student.id);
  alunosPersistidos.value.add(student.id);
}

async function finalizarAula() {
  if (!classSession.value?.id) return;

  const faltosos = students.value.filter(
    (s) =>
      s.status === "Atraso" &&
      !alunosPersistidos.value.has(s.id)
  );

  for (const student of faltosos) {
    await AttendanceDAO.insert({
      sessionId: classSession.value.id,
      studentId: student.id,
      status: "ABSENT",
      offeringId,
    });

    alunosPersistidos.value.add(student.id);
  }

  await SubjectDAO.finalizeOffering(offeringId, teacherId);

  router.push("/disciplinas");
}

const filteredStudents = computed(() => {
  let list = [...students.value];

  if (searchQuery.value) {
    list = list.filter((s) =>
      s.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (status.value !== "All") {
    list = list.filter((s) => s.status === status.value);
  }

  return list;
});

const totalStudents = computed(() => filteredStudents.value.length);

const frequenciaPercent = computed(() => {
  if (!students.value.length) return 0;
  const presentes = students.value.filter(
    (s) => s.status === "Presente"
  ).length;
  return Math.round((presentes / students.value.length) * 100);
});

onMounted(async () => {
  await loadClassSession();
  await loadOfferingData();
  await loadAttendances();

  if (route.query.started === "true") {
    addNotification("Aula iniciada com sucesso!", "success");

    router.replace({
      query: { ...route.query, started: undefined },
    });
  }
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
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
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
          <Table
            :alunos="filteredStudents"
            @aluno-click="goToUserDashboard"
            @update-status="updateAttendanceStatus"
          />

          <p class="text-sm text-gray-500 mt-4">
            Total de estudantes: {{ totalStudents }}
          </p>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

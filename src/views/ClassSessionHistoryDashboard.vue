<template>
  <BaseLayout>
    <div class="bg-white rounded-lg p-6 shadow-sm font-roboto">
      <div
        class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8"
      >
        <div>
          <h1 class="text-xl font-bold text-gray-800">
            {{ subjectName }}
          </h1>
          <p class="text-sm text-gray-500">Histórico de aulas registradas</p>

          <div class="mt-2">
            <span
              class="inline-flex items-center gap-x-1.5 rounded-full bg-[#1C5E27] px-3 py-1 text-xs font-medium text-white"
            >
              <Circle class="h-2 w-2 fill-green-300" />
              Sessões registradas
            </span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            v-model="searchDate"
            type="text"
            placeholder="Buscar por data (dd/mm)"
            class="rounded-md border border-gray-200 py-2 px-4 text-sm shadow-sm w-full sm:w-[200px]"
          />

          <select
            v-model="period"
            class="rounded-md border border-gray-200 py-2 px-4 text-sm shadow-sm w-full sm:w-[200px]"
          >
            <option
              v-for="opt in periodOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </option>
          </select>
          <button @click="downloadCsv"
            class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md flex items-center gap-2"
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
              class="lucide lucide-arrow-down-to-line-icon lucide-arrow-down-to-line"
            >
              <path d="M12 17V3" />
              <path d="m6 11 6 6 6-6" />
              <path d="M19 21H5" />
            </svg>
            Exportar CSV
          </button>
        </div>
      </div>

      <div v-if="loading" class="text-gray-500 text-center py-8">
        Carregando sessões...
      </div>

      <div
        v-else-if="Object.keys(sessionsByDay).length === 0"
        class="text-gray-500 text-center py-8"
      >
        Nenhuma sessão encontrada para os filtros selecionados.
      </div>

      <div v-else class="space-y-8">
        <div v-for="(daySessions, day) in sessionsByDay" :key="day">
          <div class="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-gray-600"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>

            <h2 class="text-sm font-semibold text-gray-700">
              {{ day }}
            </h2>
          </div>

          <div class="h-px bg-gray-200 mb-4"></div>

          <div class="space-y-3">
            <div
              v-for="session in daySessions"
              :key="session.id"
              @click="goToSessionHistory(session.id)"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-[#1C5E27] cursor-pointer transition group"
            >
              <div
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div>
                  <p class="text-xs text-gray-500">Horário</p>
                  <p class="text-base font-medium text-gray-800">
                    {{
                      new Date(session.sessionStart).toLocaleTimeString(
                        "pt-BR",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    }}
                    –
                    {{
                      session.sessionEnd
                        ? new Date(session.sessionEnd).toLocaleTimeString(
                            "pt-BR",
                            { hour: "2-digit", minute: "2-digit" }
                          )
                        : "--:--"
                    }}
                  </p>
                </div>

                <div class="sm:text-right">
                  <p class="text-xs text-gray-500">Duração</p>
                  <p class="text-base font-semibold text-gray-800">
                    <span v-if="session.sessionEnd">
                      {{
                        Math.round(
                          (new Date(session.sessionEnd) -
                            new Date(session.sessionStart)) /
                            60000
                        )
                      }}
                      min
                    </span>
                    <span v-else>-</span>
                  </p>
                </div>
              </div>

              <div
                class="mt-3 text-sm text-[#1C5E27] font-medium text-right opacity-0 group-hover:opacity-100 transition"
              >
                Ver histórico da aula →
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import AttendanceDAO from "../services/AttendanceDAO";
import { Circle } from "lucide-vue-next";
import BaseLayout from "../components/BaseLayout.vue";
import ClassSessionDAO from "../services/ClassSessionDAO";
import SubjectDAO from "../services/SubjectDAO";
import TeacherDAO from "../services/TeacherDAO";

const route = useRoute();
const router = useRouter();

const offeringId = Number(route.params.offeringId);

const subjectName = ref("Carregando...");
const sessions = ref([]);
const loading = ref(true);

const searchDate = ref("");
const period = ref("ALL");

const periodOptions = [
  { label: "Todos", value: "ALL" },
  { label: "Hoje", value: "TODAY" },
  { label: "Últimos 7 dias", value: "7D" },
  { label: "Últimos 30 dias", value: "30D" },
];

async function loadSubjectName() {
  const teacherId = localStorage.getItem("user-id");
  const offerings = await TeacherDAO.getOfferings(teacherId);
  const offering = offerings.find((o) => o.id === offeringId);

  if (!offering) return;

  const subject = await SubjectDAO.getById(offering.subjectId);
  subjectName.value = subject?.name ?? "Disciplina";
}

async function loadSessions() {
  try {
    sessions.value = await ClassSessionDAO.getAllByOfferingId(offeringId);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

const filteredSessions = computed(() => {
  const now = new Date();

  return [...sessions.value]
    .filter((session) => {
      const date = new Date(session.sessionStart);

      if (period.value !== "ALL") {
        const diffDays = (now - date) / (1000 * 60 * 60 * 24);

        if (period.value === "TODAY" && diffDays >= 1) return false;
        if (period.value === "7D" && diffDays > 7) return false;
        if (period.value === "30D" && diffDays > 30) return false;
      }

      if (searchDate.value) {
        const formatted = date.toLocaleDateString("pt-BR");
        return formatted.includes(searchDate.value);
      }

      return true;
    })
    .sort(
      (a, b) =>
        new Date(b.sessionStart).getTime() -
        new Date(a.sessionStart).getTime()
    );
});


const sessionsByDay = computed(() => {
  const map = {};

  filteredSessions.value.forEach((session) => {
    const day = new Date(session.sessionStart).toLocaleDateString("pt-BR");

    if (!map[day]) {
      map[day] = [];
    }

    map[day].push(session);
  });

  return map;
});

async function downloadCsv() {
  try {
    const response = await AttendanceDAO.exportCsvByOffering(offeringId);

    // Detecta nome do arquivo se o backend enviar Content-Disposition
    const contentDisposition = response.headers["content-disposition"];
    let filename = `frequencia-oferta-${offeringId}.csv`;

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match?.[1]) {
        filename = match[1];
      }
    }

    const blob = new Blob(
      [response.data],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erro ao baixar CSV:", error);
    alert("Erro ao baixar o arquivo CSV");
  }
}

function goToSessionHistory(sessionId) {
  router.push(`/dashboard/${offeringId}/session/${sessionId}`);
}

onMounted(async () => {
  await loadSubjectName();
  await loadSessions();
});

</script>

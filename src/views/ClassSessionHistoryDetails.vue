<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import BaseLayout from "../components/BaseLayout.vue";
import AttendanceDAO from "../services/AttendanceDAO";
import StudentDAO from "../services/StudentDAO";

const router = useRouter();
const route = useRoute();
const sessionId = Number(route.params.sessionId);

const attendances = ref([]);
const loading = ref(true);

function voltar() {
  router.back();
}
async function loadAttendances() {
  try {
    const rawAttendances = await AttendanceDAO.getBySession(sessionId);

    const studentCache = new Map();

    const enriched = await Promise.all(
      rawAttendances.map(async (a) => {
        let student = studentCache.get(a.studentId);

        if (!student) {
          student = await StudentDAO.getById(a.studentId);
          studentCache.set(a.studentId, student);
        }

        return {
          ...a,
          studentName: student?.name ?? `Aluno #${a.studentId}`,
          registration: student?.registration ?? "-",
        };
      })
    );

    attendances.value = enriched;
  } catch (err) {
    console.error("Erro ao carregar histórico:", err);
  } finally {
    loading.value = false;
  }
}

onMounted(loadAttendances);
</script>

<template>
  <BaseLayout>
    <div class="bg-white rounded-lg p-6 shadow-sm font-roboto">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h1 class="text-xl font-bold text-gray-800">Histórico da Aula</h1>
          <p class="text-sm text-gray-500">
            Presenças registradas nesta sessão
          </p>
        </div>

        <button
          class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
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
            class="lucide lucide-arrow-down-to-line"
          >
            <path d="M12 17V3" />
            <path d="m6 11 6 6 6-6" />
            <path d="M19 21H5" />
          </svg>
          Exportar CSV
        </button>
      </div>

      <div v-if="loading" class="text-gray-500 text-center py-8">
        Carregando histórico...
      </div>

      <div
        v-else-if="attendances.length === 0"
        class="text-gray-500 text-center py-8"
      >
        Nenhum registro de presença.
      </div>

      <div v-else class="overflow-x-auto">
        <table
          class="table-auto w-full border border-gray-200 shadow-sm rounded-lg"
        >
          <thead>
            <tr class="bg-gray-100 text-gray-700 text-sm">
              <th class="p-3 text-left">Aluno</th>
              <th class="p-3 text-center">Status</th>
              <th class="p-3 text-center">Horário</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="a in attendances" :key="a.id" class="hover:bg-gray-50">
              <td class="p-3">
                <div class="font-medium text-gray-800">
                  {{ a.studentName }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ a.registration }}
                </div>
              </td>

              <td class="p-3 text-center">
                <span
                  class="px-3 py-1 rounded-full text-xs font-semibold"
                  :class="{
                    'bg-green-100 text-green-800': a.status === 'PRESENT',
                    'bg-red-100 text-red-800': a.status === 'ABSENT',
                    'bg-yellow-100 text-yellow-800': a.status === 'LATE',
                  }"
                >
                  {{ a.status }}
                </span>
              </td>

              <td class="p-3 text-center text-sm text-gray-600">
                {{
                  new Date(a.recordedAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        @click="voltar"
        class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg fixed bottom-6 right-6 shadow-lg"
      >
        Voltar
      </button>
    </div>
  </BaseLayout>
</template>

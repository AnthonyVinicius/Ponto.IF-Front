<template>
  <BaseLayout>
    <div class="bg-white m-4 p-6 rounded-md shadow-md">

      <div v-if="isLoading" class="text-center text-gray-600 py-10">
        Carregando dados do aluno...
      </div>

      <div v-else-if="error" class="text-center text-red-600 py-10">
        {{ error }}
      </div>

      <div v-else>

        <div class="flex flex-wrap gap-4 items-start">
          <section class="min-w-[200px] w-full sm:w-auto">
            <p class="text-lg font-semibold text-gray-800">
              {{ aluno.name || "Aluno" }}
            </p>
            <p class="text-sm text-gray-600">
              {{ aluno.email || "Sem e-mail" }}
            </p>
            <p class="text-sm text-gray-600">
              Matrícula: {{ aluno.registration || "N/A" }}
            </p>
            <p class="text-sm text-gray-600">
              Cargo: {{ aluno.role || "Estudante" }}
            </p>
          </section>

          <div class="mt-2 sm:mt-0 sm:ms-auto w-full sm:w-auto">
            <button
              @click="biometricRegister"
              :disabled="cadastrandoBiometria"
              class="bg-[#1C5E27] disabled:bg-gray-400 hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <svg
                v-if="cadastrandoBiometria"
                class="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>

              <span>
                {{ cadastrandoBiometria ? "Aguardando leitura..." : "Registrar Biometria" }}
              </span>
            </button>

            <p
              v-if="cadastrandoBiometria"
              class="mt-2 text-sm text-gray-500 text-center sm:text-left"
            >
              Posicione o dedo no leitor biométrico
            </p>
          </div>
        </div>

        <section class="flex flex-col md:flex-row gap-6 border border-gray-200 p-4 rounded-md mt-6">

          <div class="flex-1 border border-gray-200 p-4 rounded-md text-center min-w-[250px]">
            <h2 class="text-base font-semibold text-[#1C5E27] mb-3">
              Gráfico de Frequência
            </h2>
            <FrequencyChart :percentage="frequenciaPercent" />
          </div>

          <div class="flex-1 border border-gray-200 p-4 rounded-md min-w-[250px]">
            <h2 class="text-base font-semibold text-[#1C5E27] mb-3">
              Disciplinas
            </h2>

            <div class="hidden md:block">
              <table class="table-auto w-full border-collapse border border-gray-300 shadow-sm">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="border p-2">Disciplina</th>
                    <th class="border p-2">Presenças</th>
                    <th class="border p-2">Ausências</th>
                    <th class="border p-2">Situação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(disciplina, index) in aluno.disciplines"
                    :key="index"
                    class="hover:bg-gray-50 text-center"
                  >
                    <td class="p-2">{{ disciplina.name }}</td>
                    <td class="p-2">{{ disciplina.present }}</td>
                    <td class="p-2">{{ disciplina.absent }}</td>
                    <td
                      class="p-2 font-medium"
                      :class="{
                        'text-green-600': disciplina.situation === 'Aprovado',
                        'text-red-600': disciplina.situation === 'Reprovado',
                        'text-gray-500': disciplina.situation === 'Indefinida',
                      }"
                    >
                      {{ disciplina.situation }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="md:hidden space-y-3">
              <div
                v-for="(disciplina, index) in aluno.disciplines"
                :key="index"
                class="border border-gray-300 rounded-lg p-4 shadow-sm"
              >
                <p class="font-semibold text-gray-800">{{ disciplina.name }}</p>

                <p class="text-sm text-gray-700">
                  <span class="font-medium">Presenças:</span>
                  {{ disciplina.present }}
                </p>

                <p class="text-sm text-gray-700">
                  <span class="font-medium">Ausências:</span>
                  {{ disciplina.absent }}
                </p>

                <p
                  class="mt-1 font-medium"
                  :class="{
                    'text-green-600': disciplina.situation === 'Aprovado',
                    'text-red-600': disciplina.situation === 'Reprovado',
                    'text-gray-500': disciplina.situation === 'Indefinida',
                  }"
                >
                  {{ disciplina.situation }}
                </p>
              </div>
            </div>

          </div>
        </section>

        <div class="mt-6 text-right">
          <button
            @click="voltarPagina"
            class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md transition-colors w-full sm:w-auto"
          >
            Voltar
          </button>
        </div>

      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import BaseLayout from "../components/BaseLayout.vue";
import FrequencyChart from "../components/FrequencyChart.vue";

import UserDAO from "../services/UserDAO";
import EnrollmentDAO from "../services/EnrollmentDAO";
import SubjectOfferingDAO from "../services/SubjectOfferingDAO";
import SubjectDAO from "../services/SubjectDAO";
import BiometricDAO from "../services/BiometricDAO";

const route = useRoute();
const router = useRouter();

const aluno = ref({
  id: null,
  name: "",
  email: "",
  registration: "",
  role: "",
  disciplines: [],
});

const isLoading = ref(true);
const error = ref(null);
const frequenciaPercent = ref(0);
const cadastrandoBiometria = ref(false);

const subjects = ref({});
const offerings = ref([]);
const enrollments = ref([]);

async function loadSubjects() {
  const data = await SubjectDAO.getAll();
  subjects.value = Object.fromEntries(data.map(s => [s.id, s.name]));
}

async function loadOfferings() {
  offerings.value = await SubjectOfferingDAO.getAll();
}

async function loadEnrollments(studentId) {
  enrollments.value = await EnrollmentDAO.getByStudent(studentId);
}

function buildDisciplineList() {
  aluno.value.disciplines = enrollments.value.map(en => {
    const offer = offerings.value.find(o => o.id === en.subjectOfferingId);

    return {
      name: subjects.value[offer.subjectId],
      present: en.presentCount ?? 0,
      absent: en.absentCount ?? 0,
      situation:
        en.status === "APPROVED"
          ? "Aprovado"
          : en.status === "FAILED"
          ? "Reprovado"
          : "Indefinida",
    };
  });
}

async function loadStudentsInfo(studentId) {
  try {
    isLoading.value = true;

    const response = await UserDAO.getById(studentId);

    aluno.value.id = response.id;
    aluno.value.name = response.name;
    aluno.value.email = response.email;
    aluno.value.registration = response.registration;
    aluno.value.role = response.role;
    frequenciaPercent.value = response.frequencyPercent || 0;

    await loadSubjects();
    await loadOfferings();
    await loadEnrollments(studentId);
    buildDisciplineList();
  } catch (err) {
    error.value = "Erro ao carregar os dados do aluno.";
  } finally {
    isLoading.value = false;
  }
}

async function biometricRegister() {
  try {
    cadastrandoBiometria.value = true;
    const userId = aluno.value.id;
    await BiometricDAO.insertBiometric(userId);
    alert("Biometria registrada com sucesso!");
  } catch (error) {
    alert("Falha ao registrar biometria.");
  } finally {
    cadastrandoBiometria.value = false;
  }
}

function voltarPagina() {
  router.go(-1);
}

onMounted(async () => {
  const alunoId = route.params.userId;
  await loadStudentsInfo(alunoId);
});
</script>

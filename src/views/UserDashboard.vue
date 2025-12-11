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
              @click="biometricRegister(alunoId)"
              class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md transition-colors w-full sm:w-auto"
            >
              Registrar Biometria
            </button>
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
                    <td class="p-2">{{ disciplina.name || "N/A" }}</td>
                    <td class="p-2">{{ disciplina.present || 0 }}</td>
                    <td class="p-2">{{ disciplina.absent || 0 }}</td>
                    <td
                      class="p-2 font-medium"
                      :class="{
                        'text-green-600': disciplina.situation === 'Aprovado',
                        'text-red-600': disciplina.situation === 'Reprovado',
                        'text-gray-500': !disciplina.situation,
                      }"
                    >
                      {{ disciplina.situation || "Indefinida" }}
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
                <p class="font-semibold text-gray-800">{{ disciplina.name || "N/A" }}</p>

                <p class="text-sm text-gray-700">
                  <span class="font-medium">Presenças:</span>
                  {{ disciplina.present || 0 }}
                </p>

                <p class="text-sm text-gray-700">
                  <span class="font-medium">Ausências:</span>
                  {{ disciplina.absent || 0 }}
                </p>

                <p
                  class="mt-1 font-medium"
                  :class="{
                    'text-green-600': disciplina.situation === 'Aprovado',
                    'text-red-600': disciplina.situation === 'Reprovado',
                    'text-gray-500': !disciplina.situation,
                  }"
                >
                  {{ disciplina.situation || "Indefinida" }}
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
import UserDAO from "../services/UserDAO";
import BiometricDAO from "../services/BiometricDAO";
import FrequencyChart from "../components/FrequencyChart.vue";

const route = useRoute();
const router = useRouter();

const aluno = ref({
  name: "",
  email: "",
  registration: "",
  role: "",
  disciplines: [],
});

const isLoading = ref(true);
const error = ref(null);
const frequenciaPercent = ref(0);

onMounted(async () => {
  const alunoId = route.params.userId;
  await loadStudentsInfo(alunoId);
});

async function loadStudentsInfo(alunoId) {
  try {
    isLoading.value = true;
    const response = await UserDAO.getById(alunoId);

    // 🧩 Dados mock para preencher campos vazios
    const mockData = {
      name: "Lucas Henrique Souza",
      email: "lucas.souza@ifpe.edu.br",
      registration: "2022104507",
      role: "Estudante",
      frequencyPercent: 87,
      disciplines: [
        {
          name: "Programação Web",
          present: 36,
          absent: 4,
          situation: "Aprovado",
        },
        {
          name: "Banco de Dados",
          present: 30,
          absent: 10,
          situation: "Aprovado",
        },
        {
          name: "Redes de Computadores",
          present: 25,
          absent: 15,
          situation: "Reprovado",
        },
        {
          name: "Engenharia de Software",
          present: 32,
          absent: 8,
          situation: "Aprovado",
        },
      ],
    };

    aluno.value = {
      id: response.id,
      name: response.name || mockData.name,
      email: response.email || mockData.email,
      registration: response.registration || mockData.registration,
      role: response.role || mockData.role,
      frequencyPercent: response.frequencyPercent ?? mockData.frequencyPercent,
      disciplines:
        response.disciplines?.length > 0
          ? response.disciplines
          : mockData.disciplines,
    };

    frequenciaPercent.value = aluno.value.frequencyPercent;
  } catch (err) {
    console.error(err);
    error.value = "Erro ao carregar os dados do aluno. (modo demonstração)";
    // 🧩 Usa mock completo se a requisição falhar
    aluno.value = {
      id: alunoId,
      name: "Lucas Henrique Souza",
      email: "lucas.souza@ifpe.edu.br",
      registration: "2022104507",
      role: "Estudante",
      frequencyPercent: 87,
      disciplines: [
        {
          name: "Programação Web",
          present: 36,
          absent: 4,
          situation: "Aprovado",
        },
        {
          name: "Banco de Dados",
          present: 30,
          absent: 10,
          situation: "Aprovado",
        },
        {
          name: "Redes de Computadores",
          present: 25,
          absent: 15,
          situation: "Reprovado",
        },
        {
          name: "Engenharia de Software",
          present: 32,
          absent: 8,
          situation: "Aprovado",
        },
      ],
    };
    frequenciaPercent.value = aluno.value.frequencyPercent;
  } finally {
    isLoading.value = false;
  }
}

async function biometricRegister() {
  try {
    const userId = aluno.value.id;
    if (!userId) {
      alert("ID do aluno não encontrado.");
      return;
    }

    const res = await BiometricDAO.insertBiometric(userId);
    console.log("Biometria registrada com sucesso:", res);
    alert("Biometria registrada com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar Biometria:", error);
    alert("Falha ao registrar biometria (modo demonstração).");
  }
}

function voltarPagina() {
  router.go(-1);
}
</script>

<template>
  <BaseLayout>
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-xl shadow-md border border-gray-200">
        <!-- Cabeçalho -->
        <div class="p-6 flex justify-between items-start">
          <div class="flex items-center gap-4">
            <div class="bg-green-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#1C5E27]" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 11c0 3.517-1.009 6.789-2.756 9.588-1.748 2.8-4.504 2.8-6.252 0C1.009 17.789 0 14.517 0 11c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11z"
                  transform="translate(1 1)" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-800">Leitor Biométrico</h1>
              <p class="text-gray-500 mt-1">
                Conecte o leitor e capture a presença dos alunos
              </p>
            </div>
          </div>
        </div>

        <!-- Scanner -->
        <div class="p-6 border-t">
          <div class="text-center flex flex-col items-center justify-center min-h-[300px]">
            <img src="../img/biometria.png" alt="Impressão Digital" class="w-24 h-24 text-gray-400 mb-6">

            <button
              @click="capturarDigital"
              class="bg-[#1C5E27] text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" />
              </svg>
              Capturar digital do aluno
            </button>

            <p class="mt-4 text-sm text-gray-500">
              Posicione o dedo firmemente no sensor
            </p>

            <!-- Feedback da leitura -->
            <p v-if="mensagem" :class="['mt-4 font-medium', mensagemTipo === 'sucesso' ? 'text-green-600' : 'text-red-600']">
              {{ mensagem }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BaseLayout from "../components/BaseLayout.vue";
import apiService from "../services/apiService";

const alunos = ref([]);
const mensagem = ref("");
const mensagemTipo = ref("");

onMounted(async () => {
  const response = await apiService.get("/alunos");
  alunos.value = response;
});

async function capturarDigital() {
  try {
    // Simula a leitura biométrica e identifica um aluno
    const alunoId = 1; // Exemplo. O ID real viria do leitor
    const aluno = alunos.value.find((a) => a.id === alunoId);

    if (!aluno) {
      mensagem.value = "Aluno não encontrado!";
      mensagemTipo.value = "erro";
      return;
    }

    // Atualiza status para presente
    await apiService.put(`/alunos/${alunoId}`, { status: "Presente" });
    mensagem.value = `Presença registrada para ${aluno.nome}!`;
    mensagemTipo.value = "sucesso";
  } catch (error) {
    mensagem.value = "Erro ao registrar presença.";
    mensagemTipo.value = "erro";
  }

  // Limpa mensagem após alguns segundos
  setTimeout(() => {
    mensagem.value = "";
  }, 4000);
}
</script>
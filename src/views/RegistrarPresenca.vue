<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import AttendanceDAO from "../services/AttendanceDAO";
import BiometricDAO from "../services/BiometricDAO";
import { useNotification } from "../composables/useNotification";
import Notification from "../components/Notification.vue";

const router = useRouter();
const route = useRoute();

const classSessionId = route.query.classSessionId;
const offeringId = Number(route.query.offeringId);
const role = "STUDENT";

const mensagem = ref("");
const mensagemTipo = ref("");
const lendoBiometria = ref(false);

const { addNotification } = useNotification();

onMounted(() => {
  if (!classSessionId) {
    addNotification("Sessão da aula não informada.", "error");
    router.back();
  }
});

function voltar() {
  router.back();
}

async function capturarDigital() {
  if (lendoBiometria.value) return;

  try {
    lendoBiometria.value = true;
    mensagem.value = "";
    mensagemTipo.value = "";

    const result = await BiometricDAO.insertSample(role, classSessionId);

    const payload = {
      sessionId: classSessionId,
      studentId: result.studentId,
      status: "PRESENT",
      offeringId,
    };

    await AttendanceDAO.insert(payload);

    mensagem.value = "Presença registrada com sucesso!";
    mensagemTipo.value = "sucesso";
  } catch (error) {
    console.error(error);
    mensagem.value = "Erro ao registrar presença.";
    mensagemTipo.value = "erro";
  } finally {
    lendoBiometria.value = false;
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 relative p-4"
  >
    <Notification />

    <div
      class="w-full max-w-2xl bg-white rounded-2xl shadow border border-gray-200"
    >
      <div
        class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-5"
      >
        <div class="flex items-center gap-3">
          <div class="bg-[#1C5E27] text-white p-2.5 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </div>
          <div>
            <h1 class="text-base font-bold text-gray-800">Leitor Biométrico</h1>
            <p class="text-gray-500 text-sm">
              Capture a presença por impressão digital
            </p>
          </div>
        </div>
      </div>

      <div
        class="border-t mx-4 mb-5 px-5 py-5 border border-gray-300 rounded-2xl"
      >
        <div
          class="border border-gray-300 rounded-2xl flex flex-col items-center justify-center py-6"
        >
          <div class="p-4 m-2 rounded-2xl border border-gray-200 relative">
            <img src="../img/biometria.png" class="w-32 h-32 md:w-40 md:h-40" />

            <div
              v-if="lendoBiometria"
              class="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-2xl"
            >
              <svg
                class="animate-spin h-8 w-8 text-[#1C5E27] mb-3"
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
              <span class="text-sm font-semibold text-gray-700">
                Biometria sendo lida...
              </span>
            </div>
          </div>

          <button
            @click="capturarDigital"
            :disabled="lendoBiometria"
            class="bg-[#1C5E27] disabled:bg-gray-400 text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors text-sm"
          >
            Capturar digital do usuário
          </button>

          <p class="mt-3 text-xs text-gray-500">
            Posicione o dedo firmemente no sensor
          </p>

          <p
            v-if="mensagem"
            :class="[
              'mt-4 text-sm font-medium',
              mensagemTipo === 'sucesso' ? 'text-green-600' : 'text-red-600',
            ]"
          >
            {{ mensagem }}
          </p>
        </div>
      </div>
    </div>

    <button
      @click="voltar"
      class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg fixed bottom-6 right-6 shadow-lg"
    >
      Voltar
    </button>
  </div>
</template>

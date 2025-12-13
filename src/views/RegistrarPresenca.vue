<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 relative p-4"
  >
    <Notification />

    <div
      class="w-full max-w-2xl bg-white rounded-2xl shadow border border-gray-200"
    >
      <div
        class="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start sm:items-center p-5"
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
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </div>
          <div>
            <h1 class="text-base font-bold text-gray-800">Leitor Biométrico</h1>
            <p class="text-gray-500 text-sm leading-tight">
              Conecte o leitor de digitais e capture a presença dos usuários
            </p>
          </div>
        </div>

        <button
          class="flex items-center gap-2 text-gray-700 text-xs border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
        >
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
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
          Hoje
        </button>
      </div>

      <div
        class="border-t mx-4 mb-5 px-5 py-5 border border-gray-300 rounded-2xl"
      >
        <div class="flex justify-between items-center mb-3">
          <h2 class="font-semibold text-black text-sm">Scanner</h2>

          <span
            class="text-xs text-gray-600 flex items-center gap-1 border border-gray-300 rounded-xl px-3 py-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="10" cy="7" r="1" />
              <circle cx="4" cy="20" r="1" />
              <path d="M4.7 19.3 19 5" />
              <path d="m21 3-3 1 2 2Z" />
              <path d="M9.26 7.68 5 12l2 5" />
              <path d="m10 14 5 2 3.5-3.5" />
              <path d="m18 12 1-1 1 1-1 1Z" />
            </svg>
            Dispositivo: Auto
          </span>
        </div>

        <div
          class="border border-gray-300 rounded-2xl flex flex-col items-center justify-center py-6"
        >
          <div class="p-4 m-2 rounded-2xl border border-gray-200">
            <img
              src="../img/biometria.png"
              alt="Impressão Digital"
              class="w-32 h-32 md:w-40 md:h-40 mb-4"
            />
          </div>

          <button
            @click="capturarDigital"
            class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm"
          >
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
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
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
      class="bg-[#1C5E27] text-white font-semibold py-2.5 px-4 sm:px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-xs sm:text-sm fixed bottom-4 right-4 sm:bottom-6 sm:right-6 shadow-lg"
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
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Voltar
    </button>
  </div>
</template>

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
const role = "STUDENT";

const mensagem = ref("");
const mensagemTipo = ref("");

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
  try {
    const result = await BiometricDAO.insertSample(role, classSessionId);

    const studentId = result.studentId;
    const offeringId = Number(route.query.offeringId);
    
    const payload = {
      sessionId: classSessionId,
      studentId: studentId,
      status: "PRESENT",
      offeringId: offeringId
    };

    await AttendanceDAO.insert(payload);

    mensagem.value = "Presença registrada com sucesso!";
    mensagemTipo.value = "sucesso";

  } catch (error) {
    console.error(error);
    mensagem.value = "Erro ao registrar presença.";
    mensagemTipo.value = "erro";
  }
}


</script>

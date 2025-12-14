<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import AttendanceDAO from "../services/AttendanceDAO";
import BiometricDAO from "../services/BiometricDAO";
import StudentDAO from "../services/StudentDAO";

import { useNotification } from "../composables/useNotification";
import Notification from "../components/Notification.vue";

const router = useRouter();
const route = useRoute();

const classSessionId = route.query.classSessionId;
const offeringId = Number(route.query.offeringId);
const role = "STUDENT";

const lendoBiometria = ref(false);
const leituraAtiva = ref(true);
const cooldown = ref(false);

const mensagem = ref("");
const mensagemTipo = ref("");

const { addNotification } = useNotification();

let intervalId = null;

async function lerBiometriaContinuamente() {
  if (lendoBiometria.value || cooldown.value || !leituraAtiva.value) return;

  try {
    lendoBiometria.value = true;

    const biometricResult = await BiometricDAO.insertSample(
      role,
      classSessionId
    );

    if (!biometricResult?.studentId) return;

    const student = await StudentDAO.getById(biometricResult.studentId);

    const payload = {
      sessionId: classSessionId,
      studentId: biometricResult.studentId,
      status: "PRESENT",
      offeringId
    };

    await AttendanceDAO.insert(payload);

    mensagem.value = `Presença de "${student.name}" registrada`;
    mensagemTipo.value = "sucesso";

    cooldown.value = true;
    setTimeout(() => {
      cooldown.value = false;
      mensagem.value = "";
    }, 3500);

  } catch (error) {
  } finally {
    lendoBiometria.value = false;
  }
}

onMounted(() => {
  if (!classSessionId) {
    addNotification("Sessão da aula não informada.", "error");
    router.back();
    return;
  }

  intervalId = setInterval(lerBiometriaContinuamente, 1500);
});

onUnmounted(() => {
  leituraAtiva.value = false;
  if (intervalId) clearInterval(intervalId);
});

function voltar() {
  router.back();
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 relative p-4">
    <Notification />

    <div class="w-full max-w-2xl bg-white rounded-2xl shadow border border-gray-200">
      <div class="flex items-center gap-4 p-5">
        <div class="bg-[#1C5E27] text-white p-2.5 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
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
          <h1 class="text-lg font-bold text-gray-800">
            Leitor Biométrico
          </h1>
          <p class="text-sm text-gray-500">
            Aguardando leitura da impressão digital
          </p>
        </div>
      </div>

      <div class="border-t p-6">
        <div class="flex flex-col items-center gap-4">
          <div class="relative p-4 rounded-2xl border border-gray-200">
            <img
              src="../img/biometria.png"
              class="w-36 h-36 md:w-44 md:h-44"
            />

            <div
              v-if="lendoBiometria"
              class="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-2xl"
            >
              <svg
                class="animate-spin h-8 w-8 text-[#1C5E27] mb-2"
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
                Lendo digital...
              </span>
            </div>
          </div>

          <p class="text-sm font-medium text-gray-700">
            {{ lendoBiometria ? "Lendo digital..." : "Aguardando digital" }}
          </p>

          <p
            v-if="mensagem"
            :class="[
              'mt-3 text-sm font-semibold',
              mensagemTipo === 'sucesso'
                ? 'text-green-600'
                : 'text-red-600'
            ]"
          >
            {{ mensagem }}
          </p>

          <p class="text-xs text-gray-500 mt-1">
            Posicione o dedo firmemente no sensor
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

<template>
  <div class="flex items-center justify-center min-h-screen p-4">

    <div
      class="w-full max-w-md p-8 space-y-8 bg-[#1c5e27] rounded-2xl shadow-lg">

      <div class="text-center">
        <div class="inline-block p-3 mb-4 bg-white rounded-full">
          <img src="/src/img/biometria.png" alt="Ícone de biometria" class="w-8 h-8">
        </div>

        <h1 class="text-2xl font-bold text-white">
          Administração de presença
        </h1>

        <p class="text-gray-300">
          Acesso restrito ao administrador
        </p>
      </div>

      <form class="space-y-6" @submit.prevent="handleLogin">

        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-white">
            Usuário
          </label>
          <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            class="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="seuemail@exemplo.com"
          >
        </div>

        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-white">
            Senha
          </label>
          <input
            v-model="password"
            type="password"
            name="password"
            id="password"
            class="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-800
                   focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="••••••••"
          >
        </div>

        <button
          type="submit"
          class="w-full px-4 py-3 font-semibold text-green-700 bg-white rounded-lg
                 hover:bg-gray-200 transition-colors"
        >
          Entrar
        </button>

      </form>
    </div>

    <!-- Botão flutuante responsivo -->
    <router-link to="/registrar-presenca">
      <button
        class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2
               hover:bg-[#154b1f] transition-colors text-sm
               fixed bottom-6 right-6 sm:bottom-8 sm:right-8 shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-fingerprint">
          <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/>
          <path d="M14 13.12c0 2.38 0 6.38-1 8.88"/>
          <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/>
          <path d="M2 12a10 10 0 0 1 18-6"/>
          <path d="M2 16h.01"/>
          <path d="M21.8 16c.2-2 .131-5.354 0-6"/>
          <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/>
          <path d="M8.65 22c.21-.66.45-1.32.57-2"/>
          <path d="M9 6.8a6 6 0 0 1 9 5.2v2"/>
        </svg>
        Registrar Presença
      </button>
    </router-link>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');

function handleLogin() {
  console.log("Tentativa de login:", email.value, password.value);

  localStorage.setItem('user-token', 'meu-token-secreto-123');
  router.push('/dashboard');
}
</script>

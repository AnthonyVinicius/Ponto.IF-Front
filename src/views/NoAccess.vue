<template>
  <div class=" d-flex justify-content-center bg-light">
    <div class="text-center mt-5">
      <div class="mb-4 me-3"><i class="bi bi-slash-circle text-danger block"></i></div>
      
      <div class="bg-white p-5 rounded-3 shadow-lg">
        <h1 class="display-6 fw-bold mb-3">Acesso Negado</h1>
        <p class="text-muted mb-4">Você não tem permissão para acessar esta página.</p>
        
        <a href="/" class="btn btn-danger btn-lg px-4">
          <i class="bi bi-house-door me-2"></i>
          Voltar para a página inicial
        </a>
      </div>
      <button
      @click="router.back()"
      class="bg-[#1C5E27] text-white font-semibold py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors text-sm absolute bottom-6 right-6"
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
        class="lucide lucide-arrow-big-left"
      >
        <path
          d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"
        />
      </svg>

      Voltar
    </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped>
.block{
  font-size: 56pt;
}

.btn-danger {
  transition: all 0.3s ease;
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
}



</style>
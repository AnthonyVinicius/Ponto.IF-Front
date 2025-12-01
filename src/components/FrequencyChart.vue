<template>
  <div class="bg-white rounded-lg p-6 shadow-sm w-full">

    <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide text-center">
      Gráfico de Frequência
    </h3>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">

      <div
        class="relative rounded-full flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36"
        :style="chartStyle"
      >
        <div class="absolute bg-white rounded-full w-[6.5rem] h-[6.5rem] sm:w-[8.2rem] sm:h-[8.2rem]"></div>
      </div>

      <div class="text-center sm:text-left">
        <span class="text-3xl sm:text-4xl font-bold text-gray-900">{{ percentage }}%</span>
        <p class="text-gray-500 text-sm leading-tight">
          De presença<br />registrada
        </p>
      </div>

    </div>

  </div>
</template>



<script setup>
import { computed } from 'vue';

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Cores do seu tailwind.config.js e style.css
const mainColor = '#1C5E27'; // var(--main-color) ou ponto-if-green
const grayColor = '#D9D9D9'; // ponto-if-gray

const chartStyle = computed(() => {
  return {
    background: `conic-gradient(
      ${mainColor} 0% ${props.percentage}%,
      ${grayColor} ${props.percentage}% 100%
    )`,
  };
});
</script>
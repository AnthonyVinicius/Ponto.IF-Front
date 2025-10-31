<template>
  <div class="bg-white rounded-lg p-6 shadow-sm">
    <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide text-center">
      Gráfico de Frequência
    </h3>
    <div class="flex items-center justify-center gap-6 mt-4">
      <div
        class="relative w-32 h-32 rounded-full flex items-center justify-center"
        :style="chartStyle"
      >
        <div class="absolute w-[7.5rem] h-[7.5rem] bg-white rounded-full"></div>
      </div>

      <div class="relative text-left">
        <span class="text-4xl font-bold text-gray-900">{{ percentage }}%</span>
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
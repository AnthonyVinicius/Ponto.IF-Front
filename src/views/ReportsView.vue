<template>
  <BaseLayout>
    <div class="bg-white rounded-lg p-6 shadow-sm font-roboto">
      <h1 class="text-xl font-bold text-gray-800 mb-6">Relatórios</h1>

      <div class="max-w-md">
        <FrequencyChart :percentage="75" />
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '../components/BaseLayout.vue';
import FrequencyChart from '../components/FrequencyChart.vue';

</script>
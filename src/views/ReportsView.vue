<template>
  <BaseLayout>
    <div class="bg-white rounded-lg p-6 shadow-sm font-roboto">
      <div>
        <h1 class="text-lg font-semibold text-gray-800">Relatorios de Presença</h1>
        <p class="text-sm text-gray-600">
          Disciplinas: {{ "Algoritimos" }}
        </p>
      </div>

      <div class="flex gap-50 max-w-md p-3">
        <FrequencyChart :percentage="70" />

        <div class="flex-1 border border-gray-200 p-4 rounded-md">

          <h2 class="text-base font-semibold text-[#1C5E27] mb-3">Disciplinas</h2>

          <table class="table-auto w-full border-collapse border border-gray-300 shadow-sm">
            <thead>
              <tr>
                <th class="border p-2">Disciplina</th>
                <th class="border p-2">Presenças</th>
                <th class="border p-2">Ausências</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-gray-50">
                <td class="p-2 text-center">{{ "Algoritimos" }}</td>
                <td class="p-2 text-center">{{ 0 }}</td>
                <td class="p-2 text-center">{{ 0 }}</td>

              </tr>
            </tbody>
          </table>
          <div class="flex justify-center p-3">
            <h1 class="text-base font-semibold text-[#1C5E27] mb-3">Mostrar Todas Disciplinas</h1>
          </div>
        </div>
      </div>
      <div class="flex-1 border border-gray-200 p-4 rounded-md">
        <h2 class="text-base font-semibold text-[#1C5E27] mb-3">Disciplinas</h2>
        <table class="table-auto w-full border-collapse border border-gray-300 shadow-sm">
          <thead >
            <tr>
              <th class="border p-2">Nome do Aluno</th>
              <th class="border p-2">Curso</th>
              <th class="border p-2">Matricula</th>
              <th class="border p-2">Situação</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-gray-50">
              <td class="p-2 text-center">{{ "N/A" }}</td>
              <td class="p-2 text-center">{{  0 }}</td>
              <td class="p-2 text-center">{{ 0 }}</td>
              <td class="p-2 text-center font-medium"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '../components/BaseLayout.vue';
import FrequencyChart from '../components/FrequencyChart.vue';


</script>
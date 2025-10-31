<script setup>
import { onMounted, ref } from 'vue'
import BaseLayout from '../components/BaseLayout.vue'
import BaseButton from "../components/BaseButton.vue"
// import CourseDAO from '../services/CourseDAO'
import { useRouter } from 'vue-router'
import { Search, Download, Plus } from "lucide-vue-next"

const router = useRouter()
const disciplines = ref([])
const searchQuery = ref("")

async function loadDisciplines() {
  try {
    // disciplines.value = await CourseDAO.getAll()
    disciplines.value = [
      { id: 1, name: "Algoritmos" },
      { id: 2, name: "Banco de Dados I" },
      { id: 3, name: "Engenharia de Software" },
      { id: 4, name: "Redes de Computadores" }
    ]
  } catch (error) {
    console.log("Erro ao carregar as disciplinas", error)
  }
}

function goToDisciplineReport(disciplineId) {
  router.push({
    path: `/disciplinas/${disciplineId}/gerenciar`
  })
}

const alunos = ref([
  { id: 1, nome: "João Silva", matricula: "2023001", presencas: 18, ausencias: 2 },
  { id: 2, nome: "Maria Souza", matricula: "2023002", presencas: 15, ausencias: 5 },
  { id: 3, nome: "Carlos Lima", matricula: "2023003", presencas: 20, ausencias: 0 }
])

onMounted(async () => {
  await loadDisciplines()
})
</script>

<template>
  <BaseLayout>
    <div class="bg-white p-4">
      <div class="topbar flex flex-wrap items-center justify-between gap-4 m-3">
        <div>
          <h1 class="text-lg font-semibold text-gray-800">Gerenciamento de Disciplinas</h1>
          <p class="text-sm text-gray-600">Selecione uma disciplina para visualizar e gerenciar os alunos</p>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Pesquisar disciplina"
              class="rounded-md border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <BaseButton>
            <Plus class="h-5 w-5 mr-2" />
            Nova Disciplina
          </BaseButton>

          <BaseButton>
            <Download class="h-5 w-5 mr-2" />
            Exportar CSV
          </BaseButton>
        </div>
      </div>

      <div v-if="disciplines.length === 0" class="text-center text-gray-500 p-6">
        Carregando disciplinas...
      </div>

      <div
        v-for="discipline in disciplines.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))"
        :key="discipline.id"
        class="border border-gray-200 p-4 rounded-md m-3"
      >
        <div class="flex gap-2 items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <h2
            class="text-base font-semibold text-[#1C5E27] cursor-pointer hover:text-indigo-800 transition"
            @click="goToDisciplineReport(discipline.id)"
          >
            {{ discipline.name }}
          </h2>
        </div>

        <table class="table-auto w-full border border-gray-300 m-3 shadow-sm">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2">Nome do Aluno</th>
              <th class="border border-gray-300 p-2">Matrícula</th>
              <th class="border border-gray-300 p-2">Presenças</th>
              <th class="border border-gray-300 p-2">Ausências</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="aluno in alunos"
              :key="aluno.id"
              class="hover:bg-gray-50 cursor-pointer transition"
              title="Clique para ver detalhes do aluno"
            >
              <td class="p-3 text-center">{{ aluno.nome }}</td>
              <td class="p-3 text-center">{{ aluno.matricula }}</td>
              <td class="p-3 text-center">{{ aluno.presencas }}</td>
              <td class="p-3 text-center">{{ aluno.ausencias }}</td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center p-3">
          <button class="text-base font-semibold text-[#1C5E27] hover:text-[#15461f] transition cursor-pointer">
            Mostrar Todos
          </button>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

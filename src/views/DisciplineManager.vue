<script setup>
import { onMounted, ref, computed } from 'vue'
import BaseLayout from '../components/BaseLayout.vue'
import BaseButton from "../components/BaseButton.vue"
import { useRouter } from 'vue-router'
import { Search, Download, Plus } from "lucide-vue-next"

import TeacherDAO from "../services/TeacherDAO"
import SubjectDAO from "../services/SubjectDAO"
import ClassroomDAO from "../services/ClassroomDAO"

const router = useRouter()

const offerings = ref([])
const searchQuery = ref("")

const alunos = ref([
  { id: 1, nome: "João Silva", matricula: "2023001", presencas: 18, ausencias: 2 },
  { id: 2, nome: "Maria Souza", matricula: "2023002", presencas: 15, ausencias: 5 },
  { id: 3, nome: "Carlos Lima", matricula: "2023003", presencas: 20, ausencias: 0 }
])

const teacherId = localStorage.getItem("user-id")

async function loadOfferings() {
  try {
    const data = await TeacherDAO.getOfferings(teacherId)

    const enriched = await Promise.all(
      data.map(async (offer) => {
        const subject = await SubjectDAO.getById(offer.subjectId)
        const classroom = await ClassroomDAO.getById(offer.classroomId)

        let timeStart = ""
        let timeEnd = ""

        if (offer.schedule?.time) {
          const parts = offer.schedule.time.split(" - ")
          timeStart = parts[0] || ""
          timeEnd = parts[1] || ""
        }

        return {
          ...offer,
          subjectName: subject?.name ?? "Sem título",
          classroomName: classroom?.name ?? "Sala não encontrada",
          classroomLocation: classroom?.location ?? "N/A",
          timeStart,
          timeEnd
        }
      })
    )

    offerings.value = enriched
  } catch (error) {
    console.error("Erro ao carregar disciplinas:", error)
  }
}

function goToDisciplineReport(offeringId) {
  router.push(`/disciplinas/${offeringId}/gerenciar`)
}

const filteredOfferings = computed(() =>
  offerings.value.filter(o =>
    o.subjectName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

onMounted(loadOfferings)
</script>

<template>
  <BaseLayout>
    <div class="bg-white p-4">
      <div class="topbar flex flex-wrap items-center justify-between gap-4 m-3">
        <div class="w-full sm:w-auto">
          <h1 class="text-lg font-semibold text-gray-800">Gerenciamento de Disciplinas</h1>
          <p class="text-sm text-gray-600">Selecione uma disciplina para visualizar e gerenciar os alunos</p>
        </div>

        <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div class="relative flex-1 sm:flex-none min-w-[200px]">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Pesquisar disciplina"
              class="rounded-md border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm
                     text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 w-full"
            />
          </div>

          <BaseButton class="w-full sm:w-auto justify-center">
            <Plus class="h-5 w-5 mr-2" />
            Nova Disciplina
          </BaseButton>

          <BaseButton class="w-full sm:w-auto justify-center">
            <Download class="h-5 w-5 mr-2" />
            Exportar CSV
          </BaseButton>
        </div>
      </div>

      <div v-if="filteredOfferings.length === 0" class="text-center text-gray-500 p-6">
        Nenhuma disciplina encontrada ainda.
      </div>

      <div
        v-for="offer in filteredOfferings"
        :key="offer.id"
        class="border border-gray-200 p-4 rounded-md m-3 cursor-pointer hover:bg-gray-50 transition"
      >
        <div class="flex gap-2 items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline ml-1 h-4 w-4"
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>

          <h2
            class="text-base font-semibold text-[#1C5E27] hover:text-green-800 transition"
            @click="goToDisciplineReport(offer.id)"
          >
            {{ offer.subjectName }}
          </h2>
        </div>

        <div class="hidden md:block">
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
              >
                <td class="p-3 text-center">{{ aluno.nome }}</td>
                <td class="p-3 text-center">{{ aluno.matricula }}</td>
                <td class="p-3 text-center">{{ aluno.presencas }}</td>
                <td class="p-3 text-center">{{ aluno.ausencias }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

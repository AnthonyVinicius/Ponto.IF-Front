<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { Search, Calendar, Filter, Download, Circle } from "lucide-vue-next"

import BaseLayout from "../components/BaseLayout.vue"
import BaseButton from "../components/BaseButton.vue"
import Filters from "../components/Filters.vue"
import Table from "../components/Table.vue"
import FrequencyChart from "../components/FrequencyChart.vue"
// import UserDao from "../services/UserDAO"

const disciplinaAtual = ref("Projeto em Computação")
const searchQuery = ref("")
const selectedDate = ref("")
const status = ref("All")
const statusOptions = ["All", "Presente", "Atraso", "Falta"]

const students = ref([])
const isLoading = ref(false)
const errorMessage = ref("")

const router = useRouter()

function goToUserDashboard(userId) {
  router.push(`/dashboard/${userId}/user`)
}

const loadStudents = async () => {
  isLoading.value = true
  errorMessage.value = ""

  try {
    // const response = await UserDao.getAll()
    // const data = Array.isArray(response) ? response : []
    // students.value = data.map((student) => ({
    //   ...student,
    //   hour: "--/--",
    //   date: "xx/xx/xxxx",
    //   status: "Atraso",
    // }))

    // Dados mockados
    students.value = [
      {
        id: 1,
        name: "João Silva",
        email: "joao.silva@ifpe.edu.br",
        hour: "07:45",
        date: "30/10/2025",
        status: "Presente"
      },
      {
        id: 2,
        name: "Maria Souza",
        email: "maria.souza@ifpe.edu.br",
        hour: "08:10",
        date: "30/10/2025",
        status: "Atraso"
      },
      {
        id: 3,
        name: "Carlos Lima",
        email: "carlos.lima@ifpe.edu.br",
        hour: "--/--",
        date: "30/10/2025",
        status: "Falta"
      },
      {
        id: 4,
        name: "Ana Beatriz",
        email: "ana.beatriz@ifpe.edu.br",
        hour: "07:50",
        date: "30/10/2025",
        status: "Presente"
      }
    ]
  } catch (error) {
    console.error("Erro ao carregar estudantes:", error)
    errorMessage.value = "Não foi possível carregar os estudantes."
  } finally {
    isLoading.value = false
  }
}

const filteredStudents = computed(() => {
  let alunos = [...students.value]

  if (searchQuery.value) {
    alunos = alunos.filter((aluno) =>
      aluno.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (status.value !== "All") {
    alunos = alunos.filter((aluno) => aluno.status === status.value)
  }

  return alunos
})

const totalStudents = computed(() => filteredStudents.value.length)

// Simula cálculo de frequência baseado nos mockados
const frequenciaPercent = computed(() => {
  if (!students.value.length) return 0
  const presentes = students.value.filter((s) => s.status === "Presente").length
  return Math.round((presentes / students.value.length) * 100)
})

onMounted(loadStudents)
</script>

<template>
  <BaseLayout>
    <div class="bg-white rounded-lg p-6 shadow-sm font-roboto">
      <div class="topbar flex flex-wrap items-center justify-between gap-4">
        <div class="my-6 max-w-md">
          <FrequencyChart :percentage="frequenciaPercent" class="border border-gray-200" />
        </div>

        <div class="title">
          <h1 class="text-xl font-bold text-gray-800">Lista de Presença</h1>
          <p class="text-sm text-gray-500">Usuários cadastrados</p>

          <div class="mt-2">
            <span
              class="inline-flex items-center gap-x-1.5 rounded-full bg-[#1C5E27] px-3 py-1 text-xs font-medium text-white"
            >
              <Circle class="h-2 w-2 fill-green-300" />
              {{ disciplinaAtual }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Pesquisar por aluno"
              class="rounded-md border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Calendar class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="selectedDate"
              type="date"
              class="rounded-md border border-gray-200 bg-white py-1.5 pl-10 pr-2 text-sm font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled
            />
          </div>

          <Filters v-model="status" :options="statusOptions" disabled>
            <template #icon>
              <Filter class="h-5 w-5 text-gray-500" />
            </template>
            Status: {{ status }}
          </Filters>

          <BaseButton>
            <Download class="h-5 w-5 mr-2" />
            Export CSV
          </BaseButton>
        </div>
      </div>

      <div class="mt-6">
        <div v-if="isLoading" class="text-gray-500 text-center py-8">
          Carregando estudantes...
        </div>

        <div v-else-if="errorMessage" class="text-red-500 text-center py-8">
          {{ errorMessage }}
        </div>

        <div v-else>
          <Table :alunos="filteredStudents" @aluno-click="goToUserDashboard" />
          <p class="text-sm text-gray-500 mt-4">
            Total de estudantes: {{ totalStudents }}
          </p>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

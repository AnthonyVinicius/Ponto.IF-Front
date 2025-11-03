<script setup>
import { ref, computed, onMounted } from "vue"
import BaseLayout from "../components/BaseLayout.vue"
import RecordsDAO from "../services/RecordsDAO"

const students = ref([])
const isLoading = ref(false)
const errorMessage = ref("")

const loadStudents = async () => {
  isLoading.value = true
  errorMessage.value = ""

  try {
    const students = await RecordsDAO.getAll()
  } catch (error) {
    console.error("Erro ao carregar estudantes:", error)
    errorMessage.value = "Não foi possível carregar os estudantes."
  }
}


onMounted(async() =>{
  await loadStudents()
  })
</script>

<template>
  <BaseLayout>
    <div class="bg-white rounded-lg p-6 shadow-sm font-roboto">
      <div class="topbar flex flex-wrap items-center justify-between gap-4">

        <div class="title">
          <h1 class="text-xl font-bold text-gray-800">Lista de Alunos</h1>
          <p class="text-sm text-gray-500">Alunos cadastrados</p>
        </div>
      </div>

      <div class="mt-6">
        <div v-for="student in students" class="text-gray-500 text-center py-8">
          <p>{{ student }}</p>
        </div>

  

      </div>
    </div>
  </BaseLayout>
</template>

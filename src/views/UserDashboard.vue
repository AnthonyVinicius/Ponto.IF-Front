<template>
    <BaseLayout>
        <div class="bg-white m-4 p-6 rounded-md shadow-md">
            <div v-if="isLoading" class="text-center text-gray-600 py-10">
                Carregando dados do aluno...
            </div>

            <div v-else-if="error" class="text-center text-red-600 py-10">
                {{ error }}
            </div>

            <div v-else>
                <section class="mb-6">
                    <p class="text-lg font-semibold text-gray-800">{{ aluno.name || "Aluno" }}</p>
                    <p class="text-sm text-gray-600">{{ aluno.email || "Sem e-mail" }}</p>
                    <p class="text-sm text-gray-600">Matrícula: {{ aluno.registration || "N/A" }}</p>
                    <p class="text-sm text-gray-600">Cargo: {{ aluno.role || "Estudante" }}</p>
                </section>

                <section class="flex flex-col md:flex-row gap-6 border border-gray-200 p-4 rounded-md">
                    <div class="flex-1 border border-gray-200 p-4 rounded-md text-center">
                        <h2 class="text-base font-semibold text-[#1C5E27] mb-3">Gráfico de Frequência</h2>
                        <FrequencyChart :percentage="frequenciaPercent" />
                    </div>

                    <div class="flex-1 border border-gray-200 p-4 rounded-md">
                        <h2 class="text-base font-semibold text-[#1C5E27] mb-3">Disciplinas</h2>
                        <table class="table-auto w-full border-collapse border border-gray-300 shadow-sm">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="border p-2">Disciplina</th>
                                    <th class="border p-2">Presenças</th>
                                    <th class="border p-2">Ausências</th>
                                    <th class="border p-2">Situação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(disciplina, index) in aluno.disciplines" :key="index"
                                    class="hover:bg-gray-50">
                                    <td class="p-2 text-center">{{ disciplina.name || "N/A" }}</td>
                                    <td class="p-2 text-center">{{ disciplina.present || 0 }}</td>
                                    <td class="p-2 text-center">{{ disciplina.absent || 0 }}</td>
                                    <td class="p-2 text-center font-medium" :class="{
                                        'text-green-600': disciplina.situation === 'Aprovado',
                                        'text-red-600': disciplina.situation === 'Reprovado',
                                        'text-gray-500': !disciplina.situation
                                    }">
                                        {{ disciplina.situation || "Indefinida" }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <div class="mt-6 text-right">
                    <button @click="voltarPagina"
                        class="bg-[#1C5E27] hover:bg-[#174a20] text-white font-semibold px-4 py-2 rounded-md transition-colors">
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseLayout from '../components/BaseLayout.vue'
import UserDAO from '../services/UserDAO'
import FrequencyChart from '../components/FrequencyChart.vue'

const route = useRoute()
const router = useRouter()

const aluno = ref({
    name: '',
    email: '',
    registration: '',
    role: '',
    disciplines: []
})
const isLoading = ref(true)
const error = ref(null)
const frequenciaPercent = ref(0)

onMounted(async () => {
    const alunoId = route.params.userId
    await loadStudentsInfo(alunoId)
})

async function loadStudentsInfo(alunoId) {
    try {
        isLoading.value = true
        aluno.value = await UserDAO.getById(alunoId)
        frequenciaPercent.value = aluno.value.frequencyPercent || 0
    } catch (err) {
        error.value = 'Erro ao carregar os dados do aluno.'
        console.error(err)
    } finally {
        isLoading.value = false
    }
}

function voltarPagina() {
    router.go(-1)
}
</script>

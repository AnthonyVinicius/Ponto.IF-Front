<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Search, ChevronRight } from "lucide-vue-next";
import BaseLayout from "../components/BaseLayout.vue";
import StudentDAO from "../services/StudentDAO";

const router = useRouter();

const students = ref([]);
const loading = ref(true);
const searchQuery = ref("");

async function loadStudents() {
  try {
    students.value = await StudentDAO.getAllStudents();
  } catch (err) {
    console.error("Erro ao carregar alunos:", err);
  } finally {
    loading.value = false;
  }
}

function goToStudentDashboard(studentId) {
  router.push(`/dashboard/${studentId}/user`);
}

const filteredStudents = computed(() => {
  if (!searchQuery.value) return students.value;

  return students.value.filter((s) =>
    s.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(loadStudents);
</script>

<template>
  <BaseLayout>
    <div class="bg-white rounded-lg p-6 shadow-sm font-roboto">

      <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="text-xl font-bold text-gray-800">Gerenciar Alunos</h1>
          <p class="text-sm text-gray-500">
            Clique em um aluno para acessar o dashboard individual
          </p>
        </div>

        <div class="relative w-full sm:w-auto">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Pesquisar aluno"
            class="rounded-md border border-gray-200 py-2 pl-10 pr-4 text-sm shadow-sm w-full sm:w-[260px]"
          />
        </div>
      </div>

      <div v-if="loading" class="text-gray-500 text-center py-8">
        Carregando alunos...
      </div>

      <div
        v-else-if="filteredStudents.length === 0"
        class="text-gray-500 text-center py-8"
      >
        Nenhum aluno encontrado.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="table-auto w-full border border-gray-200 shadow-sm rounded-lg">
          <thead>
            <tr class="bg-gray-100 text-gray-700 text-sm">
              <th class="p-3 text-left">Nome</th>
              <th class="p-3 text-center">Matrícula</th>
              <th class="p-3 text-left">Curso</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="student in filteredStudents"
              :key="student.id"
              @click="goToStudentDashboard(student.id)"
              class="hover:bg-gray-50 cursor-pointer transition group"
            >
              <td class="p-3">
                <div class="flex items-center justify-between">
                  <span class="font-medium text-[#1C5E27]">
                    {{ student.name }}
                  </span>

                  <ChevronRight
                    class="h-5 w-5 text-gray-300 group-hover:text-[#1C5E27] transition"
                  />
                </div>
              </td>

              <td class="p-3 text-center font-mono text-sm">
                {{ student.registration ?? "-" }}
              </td>

              <td class="p-3 text-sm text-gray-700">
                {{ student.course?.name ?? "Sem curso" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </BaseLayout>
</template>


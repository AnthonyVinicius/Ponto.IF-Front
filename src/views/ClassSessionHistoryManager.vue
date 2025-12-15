<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Search, Download } from "lucide-vue-next";

import BaseLayout from "../components/BaseLayout.vue";

import TeacherDAO from "../services/TeacherDAO";
import SubjectDAO from "../services/SubjectDAO";
import ClassroomDAO from "../services/ClassroomDAO";

const router = useRouter();

const offerings = ref([]);
const searchQuery = ref("");

const teacherId = localStorage.getItem("user-id");

async function loadOfferings() {
  try {
    const data = await TeacherDAO.getOfferings(teacherId);

    const enriched = await Promise.all(
      data.map(async (offer) => {
        const subject = await SubjectDAO.getById(offer.subjectId);
        const classroom = await ClassroomDAO.getById(offer.classroomId);

        let timeStart = "";
        let timeEnd = "";

        if (offer.schedule?.time) {
          const parts = offer.schedule.time.split(" - ");
          timeStart = parts[0] || "";
          timeEnd = parts[1] || "";
        }

        return {
          ...offer,
          subjectName: subject?.name ?? "Sem título",
          classroomName: classroom?.name ?? "Sala não encontrada",
          classroomLocation: classroom?.location ?? "N/A",
          timeStart,
          timeEnd,
        };
      })
    );

    offerings.value = enriched;
  } catch (error) {
    console.error("Erro ao carregar aulas:", error);
  }
}


function goToDashboard(offeringId) {
  router.push(`/classSessionHistoryDashboard/${offeringId}`);
}

const filteredOfferings = computed(() =>
  offerings.value.filter((o) =>
    o.subjectName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

onMounted(loadOfferings);
</script>

<template>
  <BaseLayout>
    <div class="bg-white p-4">
      <div class="topbar flex flex-wrap items-center justify-between gap-4 m-3">
        <div>
          <h1 class="text-lg font-semibold text-gray-800">
            Aulas Registradas
          </h1>
          <p class="text-sm text-gray-600">
            Selecione uma aula para visualizar o dashboard
          </p>
        </div>

        <div class="flex gap-3 items-center">
          <div class="relative min-w-[200px]">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Pesquisar disciplina"
              class="rounded-md border border-gray-200 py-2 pl-10 pr-4 text-sm shadow-sm w-full"
            />
          </div>
        </div>
      </div>

      <div
        v-if="filteredOfferings.length === 0"
        class="text-center text-gray-500 p-6"
      >
        Nenhuma aula registrada encontrada.
      </div>

      <div
        v-for="offer in filteredOfferings"
        :key="offer.id"
        class="border border-gray-200 p-4 rounded-md m-3 hover:bg-gray-50 transition cursor-pointer"
        @click="goToDashboard(offer.id)"
      >
        <div class="flex items-center gap-2 mb-2">
          <h2 class="text-base font-semibold text-[#1C5E27]">
            {{ offer.subjectName }}
          </h2>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-right ms-auto"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>

        <div class="flex gap-4 text-sm text-gray-600">
          <span>{{ offer.classroomName }}</span>
          <span>{{ offer.timeStart }} - {{ offer.timeEnd }}</span>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>


<template>
  <aside
    :class="[
      'flex h-screen flex-col overflow-y-auto border-r bg-white transition-all duration-300',
      isExpanded ? 'w-64 px-5 py-8' : 'w-20 items-center py-8 px-2'
    ]"
  >
    <div :class="['flex items-center gap-x-3', isExpanded ? '' : 'justify-center']">
      <div class="bg-[#1C5E27] text-white p-2 rounded-lg">
        <Fingerprint class="w-6 h-6" />
      </div>

      <span
        v-show="isExpanded"
        class="text-sm font-bold text-gray-800 whitespace-nowrap"
      >
        Admin de Presenças
      </span>
    </div>

    <div class="mt-10 flex flex-1 flex-col justify-between">
      <nav :class="['space-y-2', isExpanded ? '' : 'flex flex-col items-center']">
        <div
          v-for="item in menuItems"
          :key="item.label"
          @click="handleMenuClick(item)"
          :title="!isExpanded ? item.label : ''"
          class="flex cursor-pointer items-center rounded-lg px-3 py-3 text-gray-600
                 transition-colors duration-300 hover:bg-[#1C5E27] hover:text-white"
          :class="[isExpanded ? '' : 'justify-center']"
        >
          <component :is="item.icon" class="h-6 w-6" />

          <span
            v-show="isExpanded"
            class="mx-4 text-sm font-medium whitespace-nowrap"
          >
            {{ item.label }}
          </span>

          <span
            v-if="item.action === 'activeClass' && hasActiveClass && isExpanded"
            class="ml-auto text-xs bg-green-600 text-white px-2 py-0.5 rounded-full"
          >
            ativa
          </span>
        </div>
      </nav>

      <div class="mt-6 border-t pt-4">
        <button
          @click="logout"
          :title="!isExpanded ? 'Sair' : ''"
          class="flex w-full items-center rounded-lg px-3 py-3 text-gray-600
                 hover:bg-red-600 hover:text-white transition-colors"
          :class="[isExpanded ? '' : 'justify-center']"
        >
          <LogOut class="h-6 w-6" />
          <span v-show="isExpanded" class="mx-4 text-sm font-medium">
            Sair
          </span>
        </button>

        <div v-show="isExpanded" class="mt-4 border-t pt-4">
          <p class="text-sm font-semibold text-gray-700">
            {{ usuarioNome }}
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { shallowRef, computed } from "vue";
import { useRouter } from "vue-router";
import { BookCheck, PlayCircle, LogOut, Fingerprint } from "lucide-vue-next";

import { useUserStore } from "../stores/user";
import ClassSessionDAO from "../services/ClassSessionDAO";

defineProps({
  isExpanded: { type: Boolean, required: true },
});

const router = useRouter();
const userStore = useUserStore();

const menuItems = shallowRef([
  {
    label: "Gerenciar Disciplinas",
    icon: BookCheck,
    to: "/disciplinas",
  },
  {
    label: "Aula Ativa",
    icon: PlayCircle,
    action: "activeClass",
  },
]);

const usuarioNome = computed(() => userStore.name ?? "Usuário");

const hasActiveClass = computed(() => !!userStore.activeOfferingId);


async function handleMenuClick(item) {
  if (item.action === "activeClass") {
    const offeringId = userStore.activeOfferingId;

    if (!offeringId) {
      alert("Nenhuma aula ativa no momento.");
      return;
    }

    try {
      const session = await ClassSessionDAO.getByOffering(offeringId);

      if (!session || !session.active) {
        alert("A aula foi finalizada.");
        userStore.clearActiveOffering();
        return;
      }

      router.push({
        name: "Dashboard",
        params: { offeringId },
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao verificar a aula ativa.");
    }

    return;
  }

  if (item.to) {
    router.push(item.to);
  }
}

function logout() {
  userStore.logout();
  router.push("/login");
}
</script>

<style scoped>
.router-link-exact-active {
  background-color: #1c5e27;
  color: white;
}
</style>

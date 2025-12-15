<template>
  <div
    ref="dropdownRef"
    class="relative flex justify-center w-full sm:w-auto"
  >
    <button
      @click.stop="isOpen = !isOpen"
      class="flex items-center justify-center gap-2 w-full sm:w-36 px-4 py-2 rounded-full font-semibold text-sm focus:outline-none transition-colors duration-200"
      :class="{
        'bg-green-100 text-green-700': localStatus === 'Presente',
        'bg-red-100 text-red-700': localStatus === 'Falta',
        'bg-yellow-100 text-yellow-700': localStatus === 'Atraso',
      }"
    >
      <component :is="statusIcons[localStatus]" class="w-4 h-4" />
      <span class="truncate">{{ localStatus }}</span>
      <ChevronDown class="w-4 h-4 opacity-70" />
    </button>

    <div
      v-if="isOpen"
      class="absolute left-0 sm:left-auto mt-2 w-full sm:w-36 bg-white border border-gray-200 rounded-xl shadow-md z-20 overflow-hidden"
    >
      <ul class="divide-y divide-gray-100">
        <li
          v-for="option in options"
          :key="option.value"
          @click="selectStatus(option.value)"
          class="flex items-center justify-center gap-2 px-4 py-2 cursor-pointer font-semibold text-sm transition"
          :class="{
            'bg-green-100 text-green-700 hover:bg-green-200': option.value === 'Presente',
            'bg-red-100 text-red-700 hover:bg-red-200': option.value === 'Falta',
            'bg-yellow-100 text-yellow-700 hover:bg-yellow-200': option.value === 'Atraso',
          }"
        >
          <component :is="statusIcons[option.value]" class="w-4 h-4" />
          <span>{{ option.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { Check, X, Clock, ChevronDown } from "lucide-vue-next";

const props = defineProps({
  status: String,
});

const emit = defineEmits(["update"]);

const localStatus = ref(props.status);
const isOpen = ref(false);
const dropdownRef = ref(null);

watch(
  () => props.status,
  (newVal) => {
    localStatus.value = newVal;
  }
);

const options = [
  { value: "Presente", label: "Presente" },
  { value: "Falta", label: "Falta" },
  { value: "Atraso", label: "Atraso" },
];

const statusIcons = {
  Presente: Check,
  Falta: X,
  Atraso: Clock,
};

function selectStatus(value) {
  localStatus.value = value;
  emit("update", value);
  isOpen.value = false;
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>


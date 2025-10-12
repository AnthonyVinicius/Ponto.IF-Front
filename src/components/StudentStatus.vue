<template>
  <div class="flex justify-center">
    <select
      v-model="localStatus"
      @change="emitStatus"
      class="px-3 py-1 rounded-lg font-semibold text-sm focus:outline-none"
      :class="{
        'bg-green-100 text-green-700': localStatus === 'Presente',
        'bg-red-100 text-red-700': localStatus === 'Falta',
        'bg-yellow-100 text-yellow-700': localStatus === 'Atraso',
      }"
    >
      <option value="Presente">✅ Presente</option>
      <option value="Falta">❌ Falta</option>
      <option value="Atraso">⏰ Atraso</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  status: String,
});

const emit = defineEmits(["update"]);

const localStatus = ref(props.status);

watch(() => props.status, (newVal) => {
  localStatus.value = newVal;
});

function emitStatus() {
  emit("update", localStatus.value);
}
</script>
<script setup>
import { ref } from "vue";

const props = defineProps({
    modelValue: String,
    options: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);

const selectOption = (option) => {
    emit("update:modelValue", option); 
    open.value = false;               
};
</script>

<template>
  <div class="relative w-full sm:w-auto">

    <button
      type="button"
      @click="open = !open"
      class="flex items-center gap-2 w-full sm:w-auto whitespace-nowrap rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
    >
      <slot name="icon"></slot>

      <span>
        <slot>
          {{ modelValue || "Selecione..." }}
        </slot>
      </span>
    </button>

    <ul
      v-if="open && options.length"
      class="absolute left-0 mt-2 w-full sm:w-44 bg-white border rounded-md shadow-lg z-20"
    >
      <li
        v-for="option in options"
        :key="option"
        @click="selectOption(option)"
        class="p-2 hover:bg-gray-100 cursor-pointer text-sm"
      >
        {{ option }}
      </li>
    </ul>

  </div>
</template>


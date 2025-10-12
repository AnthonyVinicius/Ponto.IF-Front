<script setup>
import { ref } from "vue";
const props = defineProps({ /*...*/ });
const emit = defineEmits(["update:modelValue"]);
const open = ref(false);
const selectOption = (option) => { /*...*/ };
</script>

<template>
    <div class="relative">
        <button type="button" @click="open = !open"
            class="flex h-full items-center gap-2 whitespace-nowrap rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">

            <slot name="icon"></slot>

            <span>
                <slot>
                    {{ modelValue || 'Selecione...' }}
                </slot>
            </span>
        </button>

        <ul v-if="open && options.length" class="absolute mt-2 w-44 bg-white border rounded-md shadow-lg z-10">
            <li v-for="option in options" :key="option" @click="selectOption(option)"
                class="p-2 hover:bg-gray-100 cursor-pointer text-sm">
                {{ option }}
            </li>
        </ul>
    </div>
</template>
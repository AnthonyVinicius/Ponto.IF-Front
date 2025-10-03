<script setup>
import { ref } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    options: {
        type: Array,
        default: () => [] 
    }
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);

const selectOption = (option) => {
    emit("update:modelValue", option);
    open.value = false;
};
</script>

<template>
    <div class="relative">
        <button type="button" @click="open = !open"
            class="flex items-center border border-gray-400 rounded-md p-2 shadow-sm hover:bg-gray-50">
            <slot name="icon"></slot>

            <span>
                <slot>
                    {{ modelValue || 'Selecione...' }}
                </slot>
            </span>
        </button>

        <ul v-if="open && options.length" class="absolute mt-2 w-44 bg-white border rounded-md shadow-lg z-10">
            <li v-for="option in options" :key="option" @click="selectOption(option)"
                class="p-2 hover:bg-gray-100 cursor-pointer">
                {{ option }}
            </li>
        </ul>
    </div>
</template>

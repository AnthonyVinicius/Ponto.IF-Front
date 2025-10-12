<template>
    <BaseLayout>
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-xl shadow-md border border-gray-200">
                <div class="p-6 flex justify-between items-start">
                    <div class="flex items-center gap-4">
                        <div class="bg-green-100 p-3 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#1C5E27]" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 11c0 3.517-1.009 6.789-2.756 9.588-1.748 2.8-4.504 2.8-6.252 0C1.009 17.789 0 14.517 0 11c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11z"
                                    transform="translate(1 1)" />
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-gray-800">Leitor Biométrico</h1>
                            <p class="text-gray-500 mt-1">Conecte o leitor de digitais e capture a presença dos alunos
                            </p>
                        </div>
                    </div>
                    <button
                        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Hoje
                    </button>
                </div>

                <div class="p-6 border-t">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-semibold text-gray-700">Scanner</h2>
                        <button
                            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-lg hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18m-9-9h18"
                                    transform="rotate(45 12 12)" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 12h16" />
                            </svg>
                            Dispositivo: Auto
                        </button>
                    </div>

                    <div
                        class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center flex flex-col items-center justify-center min-h-[300px]">

                        <img src="../img/biometria.png" alt="Impressão Digital" class="w-24 h-24 text-gray-400 mb-6">

                        <button
                            class="bg-[#1C5E27] text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-[#154b1f] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" />
                            </svg>
                            Capturar digital do aluno
                        </button>
                        <p class="mt-4 text-sm text-gray-500">Posicione o dedo firmemente no sensor</p>
                    </div>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '../components/BaseLayout.vue';

</script>
<script setup>
import { ref } from 'vue'
import Footer from './Footer.vue'
import NavBar from './NavBar.vue'
import Sidebar from './Sidebar.vue'

const isExpanded = ref(true)

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Barra de navegação no topo -->
    <NavBar />

    <!-- Área central: Sidebar + Conteúdo -->
    <div class="flex flex-1">
      <!-- Sidebar ocupa toda altura entre NavBar e Footer -->
      <Sidebar 
        :is-expanded="isExpanded" 
        @toggle-sidebar="toggleSidebar"
      />

      <!-- Conteúdo da página, ao lado da Sidebar -->
      <main class="flex-1 p-6 bg-gray-50 overflow-y-auto transition-all duration-300">
        <slot></slot>
      </main>
    </div>

    <!-- Rodapé sempre no final -->
    <Footer />
  </div>
</template>

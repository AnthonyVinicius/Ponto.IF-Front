<script setup>
import { ref } from 'vue'
import Footer from './Footer.vue'
import NavBar from './Navbar.vue'
import Sidebar from './Sidebar.vue'

const isExpanded = ref(true)
const on = false
const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="flex flex-col min-h-screen">

    <NavBar />
    <div class="flex flex-1">

      <Sidebar v-if="on"
        :is-expanded="isExpanded" 
        @toggle-sidebar="toggleSidebar"
      />

      <main class="flex-1 p-6 bg-gray-50 overflow-y-auto transition-all duration-300">
        <slot></slot>
      </main>
    </div>
 
    <Footer></Footer>
  </div>
</template>

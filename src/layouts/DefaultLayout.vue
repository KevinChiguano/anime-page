<template>
    <div class="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <!-- Fondo desenfocado cuando el sidebar está abierto -->
        <div v-if="isSidebarOpen && !isDesktop" class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            @click="toggleSidebar" />

        <!-- Sidebar -->
        <Sidebar :isOpen="isSidebarOpen" :isDesktop="isDesktop" @closeSidebar="isSidebarOpen = false" />

        <!-- Contenido principal -->
        <div class="min-h-screen flex flex-col transition-all duration-300"
            :class="{ 'pl-[250px]': isSidebarOpen && isDesktop, 'pl-0': !isSidebarOpen || !isDesktop }">

            <!-- Topbar con botón para alternar -->
            <Topbar @toggleSidebar="toggleSidebar" />

            <!-- Contenido principal -->
            <main class="flex-1 overflow-y-auto pt-[53px]">
                <router-view />
            </main>

            <!-- Footer -->
            <Footer />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue'
import Footer from '../components/Footer.vue'

const isSidebarOpen = ref(window.innerWidth >= 768)

const isDesktop = ref(window.innerWidth >= 768)

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

const handleResize = () => {
    const nowDesktop = window.innerWidth >= 768
    if (!nowDesktop && isSidebarOpen.value) {
        isSidebarOpen.value = false // Auto-cerrar en móviles
    }
    isDesktop.value = nowDesktop
}

onMounted(() => {
    window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})
</script>
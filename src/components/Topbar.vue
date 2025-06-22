<template>
    <header
        class="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md px-4 py-2 flex justify-between items-center">

        <!-- Izquierda -->
        <div class="flex items-center gap-3">
            <button @click="$emit('toggleSidebar')" class="text-gray-700 dark:text-white hover:text-blue-500">
                <i data-feather="menu"></i>
            </button>
        </div>

        <!-- Derecha -->
        <div class="flex items-center gap-4">
            <!-- Cambiar tema -->
            <ThemeToggle />

            <!-- Notificaciones (igual que antes) -->
            <div class="relative">
                <button class="relative text-gray-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-400">
                    <i data-feather="bell"></i>
                    <span
                        class="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
                </button>
            </div>

            <!-- Perfil de usuario -->
            <div class="relative" ref="userMenuRef">
                <button @click="toggleUserMenu"
                    class="flex items-center gap-2 text-gray-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-400">
                    <i data-feather="user" class="w-6 h-6"></i>
                    <i data-feather="chevron-down" class="w-4 h-4"></i>
                </button>

                <div v-if="isUserMenuOpen"
                    class="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md w-56 z-50 border-2 border-gray-300 dark:border-gray-600">
                    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                        <p class="text-sm font-semibold text-gray-800 dark:text-white">Carson Darrin</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">carson.darrin@company.io</p>
                    </div>
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-100">
                        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Mi cuenta</a>
                        </li>
                        <li><a href="#"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Configuración</a></li>
                        <li><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Cerrar
                                sesión</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import feather from 'feather-icons'
import ThemeToggle from './ThemeToggle.vue'

const isUserMenuOpen = ref(false)
const userMenuRef = ref(null)

const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value
}

const handleClickOutside = (event) => {
    if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
        isUserMenuOpen.value = false
    }
}

onMounted(async () => {
    await nextTick()
    feather.replace()
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>


<style scoped>
/* Mejora de visibilidad en modo oscuro */
.group:hover .group-hover\:block {
    display: block;
}
</style>
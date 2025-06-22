<template>
    <nav :class="[
        'pc-sidebar fixed top-0 left-0 h-full w-[250px] z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full'
    ]">
        <div class="navbar-wrapper">
            <!-- Encabezado con logo -->
            <div class="m-header flex items-center py-4 px-6 h-header-height">
                <router-link to="/" class="b-brand flex items-center gap-3" @click="handleClickLink">
                    <img src="/images/favicon.svg" class="img-fluid logo logo-sm" alt="logo" />
                    <span class="pc-mtext">Pag. Anime</span>
                </router-link>
            </div>

            <!-- Contenido de navegación -->
            <div class="navbar-content h-[calc(100vh_-_74px)] py-2.5 overflow-y-auto">
                <ul class="pc-navbar space-y-2">
                    <li class="pc-item pc-caption"><label>Navigation</label></li>

                    <li class="pc-item">
                        <router-link to="/" class="pc-link" @click="handleClickLink">
                            <span class="pc-micon"><i data-feather="home"></i></span>
                            <span class="pc-mtext">Inicio</span>
                        </router-link>
                    </li>

                    <li class="pc-item pc-caption">
                        <label>Animes</label>
                    </li>

                    <li class="pc-item">
                        <a href="#" class="pc-link" @click="handleClickLink">
                            <span class="pc-micon"><i data-feather="edit"></i></span>
                            <span class="pc-mtext">Todos</span>
                        </a>
                    </li>

                    <li class="pc-item">
                        <a href="#" class="pc-link" @click="handleClickLink">
                            <span class="pc-micon"><i data-feather="type"></i></span>
                            <span class="pc-mtext">Typography</span>
                        </a>
                    </li>

                    <li class="pc-item">
                        <a href="#" class="pc-link" @click="handleClickLink">
                            <span class="pc-micon"><i data-feather="feather"></i></span>
                            <span class="pc-mtext">Icons</span>
                        </a>
                    </li>

                    <li class="pc-item pc-caption">
                        <label>Mangas</label>
                    </li>

                    <li class="pc-item">
                        <a href="#" class="pc-link" target="_blank" @click="handleClickLink">
                            <span class="pc-micon"><i data-feather="lock"></i></span>
                            <span class="pc-mtext">Todos</span>
                        </a>
                    </li>

                    <li class="pc-item">
                        <a href="#" class="pc-link" target="_blank" @click="handleClickLink">
                            <span class="pc-micon"><i data-feather="user-plus"></i></span>
                            <span class="pc-mtext">Register</span>
                        </a>
                    </li>

                    <li class="pc-item pc-caption">
                        <label>Other</label>
                    </li>

                    <!-- Nivel de menú con submenús anidados (simplificado) -->
                    <li class="pc-item">
                        <a href="#" class="pc-link" @click.prevent="toggleSubmenu">
                            <span class="pc-micon"><i data-feather="sidebar"></i></span>
                            <span class="pc-mtext">Other</span>
                            <i data-feather="chevron-down" class="ml-auto"></i>
                        </a>
                        <ul v-show="submenuOpen" class="ml-6 space-y-1">
                            <li>
                                <a href="#" class="pc-link text-sm" @click="handleClickLink">Subitem 1</a>
                            </li>
                            <li>
                                <a href="#" class="pc-link text-sm" @click="handleClickLink">Subitem 2</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import feather from 'feather-icons'

const submenuOpen = ref(false)

function toggleSubmenu() {
    submenuOpen.value = !submenuOpen.value
}

//Props
const props = defineProps({
    isOpen: Boolean,
    isDesktop: Boolean
})

const emit = defineEmits(['closeSidebar'])

function handleClickLink() {
    if (!props.isDesktop) {
        emit('closeSidebar')
    }
}

// Reemplaza los iconos al montar
onMounted(async () => {
    await nextTick()
    feather.replace()
})
</script>

<style scoped>
.pc-sidebar {
    width: 250px;
    background-color: white;
    border-right: 1px solid #e5e7eb;
}

.dark .pc-sidebar {
    background-color: #1f2937;
    /* gris oscuro */
    border-color: #374151;
}

.pc-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: #1f2937;
    text-decoration: none;
    transition: background 0.2s;
}

.dark .pc-link {
    color: #f9fafb;
}

.pc-link:hover {
    background-color: #e5e7eb;
}

.dark .pc-link:hover {
    background-color: #374151;
}

.pc-caption {
    padding: 0.5rem 1rem;
    font-weight: bold;
    font-size: 0.875rem;
    color: #6b7280;
}

.dark .pc-caption {
    color: #9ca3af;
}


.pc-link.router-link-exact-active {
  background-color: #e5e7eb; /* bg-gray-200 */
  color: #1f2937; /* text-gray-800 */
  font-weight: 600;
}

.dark .pc-link.router-link-exact-active {
  background-color: #374151; /* bg-gray-700 */
  color: #f9fafb; /* text-gray-100 */
  font-weight: 600;
}



</style>
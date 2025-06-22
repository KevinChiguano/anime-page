<template>
    <button
      @click="toggleDarkMode"
      class="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
      aria-label="Cambiar tema"
      v-html="iconSvg"
    ></button>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import feather from 'feather-icons'
  
  const isDark = ref(false)
  
  // Renderiza el ícono correcto como SVG
  const iconSvg = computed(() => {
    const iconName = isDark.value ? 'moon' : 'sun'
    return feather.icons[iconName].toSvg({ class: 'w-5 h-5' })
  })
  
  onMounted(() => {
    isDark.value = localStorage.getItem('theme') === 'dark'
    document.documentElement.classList.toggle('dark', isDark.value)
  })
  
  function toggleDarkMode() {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark.value)
  }
  </script>
  
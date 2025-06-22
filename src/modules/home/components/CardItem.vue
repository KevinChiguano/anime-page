<template>
    <div
      class="flex-shrink-0 w-[160px] sm:w-[170px] md:w-[180px] lg:w-[190px] cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
      @click="$emit('select', { id, title, image, type, synopsis, category })"
    >
      <div
        class="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md transition-shadow duration-300 hover:shadow-xl"
      >
        <img :src="image" alt="Imagen" class="w-full h-[280px] object-cover" />
      </div>
  
      <div class="mt-3 px-1 space-y-1">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
          {{ title }}
        </h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
          {{ type }}
        </p>
      </div>
    </div>
  </template>
  

<script setup>
defineProps({
    id: Number,
    image: String,
    title: String,
    type: {
        type: String,
        required: false
    },
    synopsis: {
        type: String,
        required: false
    },
    category:{
        type: String,
        required: false
    }
})
</script>
<template>
    <div
        class="min-w-full h-full flex flex-col md:flex-row items-center bg-white dark:bg-gray-900 overflow-hidden relative transition-all duration-500 ease-in-out">
        <!-- Imagen -->
        <div class="w-full md:w-1/2 h-[300px] md:h-full relative flex items-center justify-center">
            <img :src="item.image" class="w-full h-full object-cover md:object-contain object-center md:object-center" draggable="false" />

            <!-- Overlay con texto solo en pantallas pequeñas -->
            <div
                class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white md:hidden px-6 text-center space-y-4">
                <h2 class="text-2xl font-bold">{{ item.title }}</h2>
                <button class="px-5 py-2 bg-blue-600 hover:bg-blue-700 transition">
                    Ver más
                </button>
            </div>
        </div>

        <!-- Texto en pantallas medianas y grandes -->
        <div class="hidden md:flex w-full md:w-1/2 items-center justify-center bg-transparent z-10">
            <div class="space-y-4 text-left max-w-xl px-6 sm:px-12 py-6">
                <!-- Título -->
                <h2 class="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                    {{ item.title }}
                </h2>

                <!-- Descripción con line-clamp -->
                <p class="line-clamp-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {{ item.description }}
                </p>

                <!-- Botón -->
                <button class="mt-2 px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 transition">
                    Ver más
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    item: {
        type: Object,
        required: true,
    },
});


</script>

<style></style>
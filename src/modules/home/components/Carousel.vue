<template>
    <div v-if="items.length" class="relative w-full aspect-[16/9] md:h-[500px] h-[300px] overflow-hidden">
        <div ref="carousel" class="flex h-full" :class="{ 'transition-transform duration-700 ease-in-out': animating }"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }" @transitionend="handleTransitionEnd">
            <!-- Clon del último item -->
            <SlideItem :item="items[items.length - 1]" />

            <!-- Items reales -->
            <SlideItem v-for="(item, index) in items" :key="index" :item="item" />

            <!-- Clon del primer item -->
            <SlideItem :item="items[0]" />
        </div>

        <!-- Botones -->
        <button @click="prevSlide"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-10">
            <i data-feather="chevron-left"></i>
        </button>
        <button @click="nextSlide"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-10">
            <i data-feather="chevron-right"></i>
        </button>
    </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import SlideItem from './SlideItem.vue'



const carousel = ref(null)
const currentIndex = ref(1)
const animating = ref(true)
let interval = null
let isTransitioning = false



const nextSlide = () => {
    if (isTransitioning) return
    isTransitioning = true
    currentIndex.value++
    animating.value = true
    resetTimer()
}

const prevSlide = () => {
    if (isTransitioning) return
    isTransitioning = true
    currentIndex.value--
    animating.value = true
    resetTimer()
}

const handleTransitionEnd = async () => {
    if (currentIndex.value === props.items.length + 1) {
        animating.value = false
        currentIndex.value = 1
        await nextTick()
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                animating.value = true
            })
        })
    }

    if (currentIndex.value === 0) {
        animating.value = false
        currentIndex.value = props.items.length
        await nextTick()
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                animating.value = true
            })
        })
    }

    isTransitioning = false
}

const startAutoSlide = () => {
    interval = setInterval(() => {
        nextSlide()
    }, 5000)
}

const resetTimer = () => {
    clearInterval(interval)
    startAutoSlide()
}

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
})

onMounted(async () => {
    startAutoSlide()
    import('feather-icons').then((feather) => feather.replace())

})

onBeforeUnmount(() => {
    clearInterval(interval)
})
</script>

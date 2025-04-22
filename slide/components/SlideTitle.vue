<script setup lang="ts">
const { isShadow } = defineProps({
    isShadow: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div class="w-full h-full flex justify-center items-center">
        <h1 class="!text-6xl font-bold text-center " :class="`${isShadow ? 'text-stroke-2 text-stroke-black' : ''}`">
            <slot></slot>
        </h1>
    </div>
</template>
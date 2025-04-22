<script setup>
import { defineProps } from 'vue'

defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <div class="flex flex-col items-center">
        <img :src="src" :alt="alt" class="rounded shadow-md max-h-xl" />
        <p class="mt-2 text-sm text-gray-600">
            <slot></slot>
        </p>
    </div>
</template>
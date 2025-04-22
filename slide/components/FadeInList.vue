<script setup lang="ts">
const props = defineProps({
    items: Array<string>
});
</script>

<template>
    <ul>
        <TransitionGroup name="fade" tag="ul">
            <li v-click v-for="(item, index) in items" :key="index" class="fade-in">
                {{ item }}
            </li>
        </TransitionGroup>
    </ul>
</template>
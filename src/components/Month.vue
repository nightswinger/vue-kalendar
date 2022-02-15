<script setup lang="ts">
import { computed } from 'vue';
import Tile from './Tile.vue';

defineProps<{
  date: Date
}>()

const computedClass = computed(() => {
  return ['vue-kalendar__year-view__months__month']
})

const formatMonth = (date: Date) => Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
</script>

<template>
  <Tile :classes="computedClass">
    {{ formatMonth(date) }}
  </Tile>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Tile from './Tile.vue';

defineProps<{
  date: Date
}>()

const computedClass = computed(() => {
  return [
    'vue-kalendar__decade-view__years__year'
  ]
})
const formatYear = (date: Date) => Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date)
</script>

<template>
  <Tile :classes="computedClass">
    {{ formatYear(date) }}
  </Tile>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getBeginOfDecadeYear, getEndOfDecadeYear } from '../utils/dates';
import Tile from './Tile.vue';

defineProps<{ date: Date }>()

const computedClass = computed(() => {
  return [
    'vue-kalendar__century-view__decades__decade'
  ]
})

const formatYear = (date: Date) => Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date)
const formatDecadeYearLabel = (date: Date) => {
  const startDecadeYear = getBeginOfDecadeYear(date)
  const endDecadeYear = getEndOfDecadeYear(date)

  return Array.from([startDecadeYear, endDecadeYear], date => formatYear(date)).join(' - ')
}
</script>

<template>
  <Tile :classes="computedClass">
    {{ formatDecadeYearLabel(date) }}
  </Tile>
</template>

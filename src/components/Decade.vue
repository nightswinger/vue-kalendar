<script setup lang="ts">
import { getBeginOfDecadeYear, getEndOfDecadeYear } from '../utils/dates';

defineProps<{ date: Date }>()

const formatYear = (date: Date) => Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date)
const formatDecadeYearLabel = (date: Date) => {
  const startDecadeYear = getBeginOfDecadeYear(date)
  const endDecadeYear = getEndOfDecadeYear(date)

  return Array.from([startDecadeYear, endDecadeYear], date => formatYear(date)).join(' - ')
}
</script>

<template>
  <div class="vue-kalendar__tile vue-kalendar__century-view__decades__decade">
    {{ formatDecadeYearLabel(date) }}
  </div>
</template>

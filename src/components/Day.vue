<script setup lang="ts">import { computed } from 'vue';
import Tile from './Tile.vue';

const props = defineProps<{
  currentMonth: number
  date: Date
}>()

const isWeekend = (date: Date) => {
  const weekday = date.getDay()
  
  return weekday === 0 || weekday === 6
}
const computedClass = computed(() => {
  return [
    'vue-kalendar__month-view__days__day',
    { 'vue-kalendar__month-view__days__day--weekend': isWeekend(props.date) },
    props.date.getMonth() !== props.currentMonth ? 'vue-kalendar__month-view__days__day--neighboringMonth' : ''
  ]
})
const formatDay = (date: Date) => Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)
</script>

<template>
  <Tile :classes="computedClass">
    {{ formatDay(date) }}
  </Tile>
</template>

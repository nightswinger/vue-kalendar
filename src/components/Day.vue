<script setup lang="ts">import { computed } from 'vue';

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
    'vue-kalendar__tile',
    { 'vue-kalendar__month-view__days__day--weekend': isWeekend(props.date) },
    props.date.getMonth() !== props.currentMonth ? 'vue-kalendar__month-view__days__day--neighboringMonth' : null
  ]
})
const formatDay = (date: Date) => Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)
</script>

<template>
  <div :class="computedClass">
    {{ formatDay(date) }}
  </div>
</template>

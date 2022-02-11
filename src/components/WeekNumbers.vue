<script setup lang="ts">import { computed } from 'vue';
import { getBeginOfWeek, getDayOfWeek, getDaysInMonth, getWeekNumber } from '../utils/dates';
import WeekNumber from './WeekNumber.vue';

const props = defineProps<{
  activeStartDate: Date
  localeFirstDayOfYear?: number
}>()

const numberOfWeeks = computed(() => {
  const numberOfDays = getDaysInMonth(props.activeStartDate)
  const startWeekday = getDayOfWeek(props.activeStartDate, props.localeFirstDayOfYear)

  const days = numberOfDays - (7 - startWeekday)
  return 1 + Math.ceil(days / 7)
})

const dates = computed(() => {
  const year = props.activeStartDate.getFullYear()
  const month = props.activeStartDate.getMonth()
  const day = props.activeStartDate.getDate()

  const result = []
  for (let i = 0; i < numberOfWeeks.value; i += 1) {
    result.push(getBeginOfWeek(new Date(year, month, day + i * 7), props.localeFirstDayOfYear))
  }

  return result
})

const weekNumbers = computed(() => dates.value.map(date => getWeekNumber(date)))
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexBasis: 'calc(100% * (1 / 8))',
      flexDirection: 'column',
      flexShrink: 0,
      flexWrap: 'nowrap',
    }"
  >
    <WeekNumber
      v-for="(weekNumber, i) in weekNumbers"
      :key="i"
      :week-number="weekNumber"
      :style="{
        flexBasis: `${100 / numberOfWeeks}%`,
        flexGrow: 0,
        flexShrink: 0,
        overflow: 'hidden'
      }"
    />
  </div>
</template>

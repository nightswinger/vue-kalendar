<script setup lang="ts">import { computed, inject } from 'vue'
import { getBeginOfDay, getEndOfDay } from '../utils/dates'
import { CalendarStore, CalendarStoreKey } from '../utils/hooks'
import Tile from './Tile.vue'

const props = defineProps<{
  currentMonth: number
  date: Date
}>()

const {
  isDateInRange,
  maxDate,
  minDate,
  updateActiveStartDate,
  updateValue
} = inject(CalendarStoreKey) as CalendarStore

const isActive = (date: Date) => {
  const beginOfDay = getBeginOfDay(date)
  const endOfDay = getEndOfDay(date)

  return isDateInRange([beginOfDay, endOfDay])
}
const isNow = (date: Date) => {
  const now = new Date()
  const beginOfDay = getBeginOfDay(now)
  const endOfDay = getEndOfDay(now)

  return beginOfDay <= date && endOfDay >= date
}
const isWeekend = (date: Date) => {
  const weekday = date.getDay()

  return weekday === 0 || weekday === 6
}
const computedClass = computed(() => {
  return [
    'vue-kalendar__month-view__days__day',
    { 'vue-kalendar__tile--active': isActive(props.date) },
    { 'vue-kalendar__tile--now': isNow(props.date) },
    { 'vue-kalendar__month-view__days__day--weekend': isWeekend(props.date) },
    props.date.getMonth() !== props.currentMonth ? 'vue-kalendar__month-view__days__day--neighboringMonth' : ''
  ]
})
const formatDay = (date: Date) => Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)

const onClick = (event: MouseEvent) => {
  if (props.date.getMonth() !== props.currentMonth) {
    updateActiveStartDate(props.date)

    const { target } = event
    if (!(target instanceof HTMLElement)) return

    target?.blur()
  }
  updateValue(props.date)
}

const disabled = computed(() => {
  return (maxDate.value ? props.date > maxDate.value : false) ||
    (minDate.value ? props.date < minDate.value : false)
})
</script>

<template>
  <Tile
    :classes="computedClass"
    :disabled="disabled"
    @click="(e) => onClick(e)"
  >
    {{ formatDay(date) }}
  </Tile>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { getBeginOfMonth, getEndOfMonth } from '../utils/dates'
import { CalendarStoreKey, CalendarStore } from '../utils/hooks'
import Tile from './Tile.vue'

const props = defineProps<{
  date: Date
}>()

const {
  isRange,
  locale,
  maxDate,
  maxDetail,
  minDate,
  updateActiveStartDate,
  updateValue,
  updateView,
  value
} = inject(CalendarStoreKey) as CalendarStore

const isActive = (date: Date) => !isRange.value ? date.getTime() === value.value.getTime() : false
const isNow = (date: Date) => {
  const now = new Date()
  const beginOfMonth = getBeginOfMonth(now)
  const endOfMonth = getEndOfMonth(now)

  return beginOfMonth <= date && endOfMonth >= date
}
const hasActive = (date: Date) => {
  const beginOfMonth = getBeginOfMonth(date)
  const endOfMonth = getEndOfMonth(date)

  if (isRange.value) {
    const [from, to] = value.value
    return (beginOfMonth <= from && endOfMonth >= from) ||
      (beginOfMonth <= to && endOfMonth >= to) ||
      (beginOfMonth >= from && endOfMonth <= to)
  }

  return beginOfMonth <= value.value && endOfMonth >= value.value
}
const computedClass = computed(() => {
  return [
    'vue-kalendar__year-view__months__month',
    { 'vue-kalendar__tile--active': isActive(props.date) },
    { 'vue-kalendar__tile--now': isNow(props.date) },
    { 'vue-kalendar__tile--hasActive': !isActive(props.date) && hasActive(props.date) }
  ]
})

const formatMonth = (date: Date) => Intl.DateTimeFormat(locale.value, { month: 'long' }).format(date)

const onClick = () => {
  updateActiveStartDate(props.date)
  updateView('month')

  if (maxDetail.value === 'year') {
    updateValue(props.date)
  }
}

const disabled = computed(() => {
  return (maxDate.value ? props.date >= maxDate.value : false) ||
    (minDate.value ? props.date < getBeginOfMonth(minDate.value) : false)
})
</script>

<template>
  <Tile
    :classes="computedClass"
    :disabled="disabled"
    @click="onClick"
  >
    {{ formatMonth(date) }}
  </Tile>
</template>

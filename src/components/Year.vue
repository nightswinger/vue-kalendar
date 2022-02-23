<script setup lang="ts">
import { computed, inject } from 'vue';
import { getBeginOfYear, getEndOfYear } from '../utils/dates';
import type { CalendarStore } from '../utils/hooks';
import { CalendarStoreKey } from '../utils/hooks';
import Tile from './Tile.vue';

const props = defineProps<{
  date: Date
}>()

const {
  maxDate,
  minDate,
  updateActiveStartDate,
  updateView,
  value
} = inject(CalendarStoreKey) as CalendarStore

const isNow = (date: Date) => {
  const now = new Date()
  const beginOfYear = getBeginOfYear(now)
  const endOfYear = getEndOfYear(now)

  return beginOfYear <= date && endOfYear >= date
}
const hasActive = (date: Date) => {
  const beginOfYear = getBeginOfYear(value.value)
  const endOfYear = getEndOfYear(value.value)

  return beginOfYear <= date && endOfYear >= date
}
const computedClass = computed(() => {
  return [
    'vue-kalendar__decade-view__years__year',
    { 'vue-kalendar__tile--now': isNow(props.date) },
    { 'vue-kalendar__tile--hasActive': hasActive(props.date) }
  ]
})
const formatYear = (date: Date) => Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date)

const onClick = () => {
  updateActiveStartDate(props.date)
  updateView('year')
}

const disabled = computed(() => {
  return (maxDate.value ? props.date > maxDate.value : false) ||
    (minDate.value ? props.date < getBeginOfYear(minDate.value) : false)
})
</script>

<template>
  <Tile
    :classes="computedClass"
    :disabled="disabled"
    @click="onClick"
  >
    {{ formatYear(date) }}
  </Tile>
</template>

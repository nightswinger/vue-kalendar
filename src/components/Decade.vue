<script setup lang="ts">
import { computed, inject } from 'vue'
import { getBeginOfDecadeYear, getEndOfDecadeYear } from '../utils/dates'
import type { CalendarStore } from '../utils/hooks'
import { CalendarStoreKey } from '../utils/hooks'
import Tile from './Tile.vue'

const props = defineProps<{ date: Date }>()

const {
  isRange,
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
  const startDecadeYear = getBeginOfDecadeYear(now)
  const endDecadeYear = getEndOfDecadeYear(now)

  return startDecadeYear <= date && endDecadeYear >= date
}
const hasActive = (date: Date) => {
  const startDecadeYear = getBeginOfDecadeYear(date)
  const endDecadeYear = getEndOfDecadeYear(date)

  if (isRange.value) {
    const [from, to] = value.value
    return (startDecadeYear <= from && endDecadeYear >= from) ||
      (startDecadeYear <= to && endDecadeYear >= to) ||
      (startDecadeYear >= from && endDecadeYear <= to)
  }

  return startDecadeYear <= value.value && endDecadeYear >= value.value
}
const computedClass = computed(() => {
  return [
    'vue-kalendar__century-view__decades__decade',
    { 'vue-kalendar__tile--active': isActive(props.date) },
    { 'vue-kalendar__tile--now': isNow(props.date) },
    { 'vue-kalendar__tile--hasActive': !isActive(props.date) && hasActive(props.date) }
  ]
})

const formatYear = (date: Date) => Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date)
const formatDecadeYearLabel = (date: Date) => {
  const startDecadeYear = getBeginOfDecadeYear(date)
  const endDecadeYear = getEndOfDecadeYear(date)

  return Array.from([startDecadeYear, endDecadeYear], date => formatYear(date)).join(' - ')
}

const onClick = () => {
  updateActiveStartDate(props.date)
  updateView('decade')

  if (maxDetail.value === 'century') {
    updateValue(props.date)
  }
}

const disabled = computed(() => {
  let maxStartDecadeYear
  let minStartDecadeYear
  if (maxDate.value) maxStartDecadeYear = getBeginOfDecadeYear(maxDate.value)
  if (minDate.value) minStartDecadeYear = getBeginOfDecadeYear(minDate.value)

  return (maxStartDecadeYear && (props.date > maxStartDecadeYear)) ||
    (minStartDecadeYear && (props.date < minStartDecadeYear))
})
</script>

<template>
  <Tile
    :classes="computedClass"
    :disabled="disabled"
    @click="onClick"
  >
    {{ formatDecadeYearLabel(date) }}
  </Tile>
</template>

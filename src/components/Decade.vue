<script setup lang="ts">
import { computed, inject } from 'vue';
import { getBeginOfDecadeYear, getEndOfDecadeYear } from '../utils/dates';
import type { CalendarStore } from '../utils/hooks';
import { CalendarStoreKey } from '../utils/hooks';
import Tile from './Tile.vue';

const props = defineProps<{ date: Date }>()

const {
  updateActiveStartDate,
  updateView,
  value
} = inject(CalendarStoreKey) as CalendarStore

const isNow = (date: Date) => {
  const now = new Date()
  const startDecadeYear = getBeginOfDecadeYear(now)
  const endDecadeYear = getEndOfDecadeYear(now)

  return startDecadeYear <= date && endDecadeYear >= date
}
const hasActive = (date: Date) => {
  const startDecadeYear = getBeginOfDecadeYear(value.value)
  const endDecadeYear = getEndOfDecadeYear(value.value)

  return startDecadeYear <= date && endDecadeYear >= date
}
const computedClass = computed(() => {
  return [
    'vue-kalendar__century-view__decades__decade',
    { 'vue-kalendar__tile--now': isNow(props.date) },
    { 'vue-kalendar__tile--hasActive': hasActive(props.date) }
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
}
</script>

<template>
  <Tile
    :classes="computedClass"
    @click="onClick"
  >
    {{ formatDecadeYearLabel(date) }}
  </Tile>
</template>

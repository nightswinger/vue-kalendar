<script setup lang="ts">
import { computed, inject } from 'vue';
import { getBeginOfMonth, getEndOfMonth } from '../utils/dates';
import { CalendarStoreKey, CalendarStore } from '../utils/hooks';
import Tile from './Tile.vue';

const props = defineProps<{
  date: Date
}>()

const {
  updateActiveStartDate,
  updateView,
  value
} = inject(CalendarStoreKey) as CalendarStore

const isNow = (date: Date) => {
  const now = new Date()
  const beginOfMonth = getBeginOfMonth(now)
  const endOfMonth = getEndOfMonth(now)

  return beginOfMonth <= date && endOfMonth >= date
}
const hasActive = (date: Date) => {
  const beginOfMonth = getBeginOfMonth(value.value)
  const endOfMonth = getEndOfMonth(value.value)

  return beginOfMonth <= date && endOfMonth >= date
}
const computedClass = computed(() => {
  return [
    'vue-kalendar__year-view__months__month',
    { 'vue-kalendar__tile--now': isNow(props.date) },
    { 'vue-kalendar__tile--hasActive': hasActive(props.date) }
  ]
})

const formatMonth = (date: Date) => Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)

const onClick = () => {
  updateActiveStartDate(props.date)
  updateView('month')
}
</script>

<template>
  <Tile
    :classes="computedClass"
    @click="onClick"
  >
    {{ formatMonth(date) }}
  </Tile>
</template>

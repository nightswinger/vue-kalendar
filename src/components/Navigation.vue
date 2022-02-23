<script setup lang="ts">
import { computed, inject } from 'vue';
import { getBeginOfCenturyYear, getBeginOfDecadeYear, getEndOfCenturyYear, getEndOfDecadeYear, getMonthsAgo, getMonthsSince, getYearsAgo, getYearsSince } from '../utils/dates';
import type { CalendarStore } from '../utils/hooks';
import { CalendarStoreKey } from '../utils/hooks';

const props = defineProps<{
  activeStartDate: Date
  drillUp: Function
  updateActiveStartDate: Function
  view: string
}>()

const {
  maxDate
} = inject(CalendarStoreKey) as CalendarStore

const formatMonthYear = (date: Date) => Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)
const formatYear = (date: Date) => Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date)
const formatDecadeYearLabel = (date: Date) => {
  const startDecadeYear = getBeginOfDecadeYear(date)
  const endDecadeYear = getEndOfDecadeYear(date)

  return Array.from([startDecadeYear, endDecadeYear], date => formatYear(date)).join(' - ')
}
const formatCenturyYearLabel = (date: Date) => {
  const startCenturyYear = getBeginOfCenturyYear(date)
  const endCenturyYear = getEndOfCenturyYear(date)

  return Array.from([startCenturyYear, endCenturyYear], date => formatYear(date)).join(' - ')
}
const label = computed(() => {
  switch (props.view) {
    case 'month':
      return formatMonthYear(props.activeStartDate)
    case 'year':
      return formatYear(props.activeStartDate)
    case 'decade':
      return formatDecadeYearLabel(props.activeStartDate)
    case 'century':
      return formatCenturyYearLabel(props.activeStartDate)
    default:
      throw new Error(`Invalid view: ${props.view}`)
  }
})

const nextActiveStartDate = computed(() => {
  switch (props.view) {
    case 'month':
      return getMonthsSince(props.activeStartDate, 1)
    case 'year':
      return getYearsSince(props.activeStartDate, 1)
    case 'decade':
      return getYearsSince(props.activeStartDate, 10)
    case 'century':
      return getYearsSince(props.activeStartDate, 100)
    default:
      throw new Error(`Invalid view: ${props.view}`)
  }
})
const nextDoubleActiveStartDate = computed(() => {
  switch (props.view) {
    case 'month':
      return getMonthsSince(props.activeStartDate, 12)
    case 'year':
      return getYearsSince(props.activeStartDate, 10)
    case 'decade':
      return getYearsSince(props.activeStartDate, 100)
    default:
      throw new Error(`Invalid view: ${props.view}`)
  }
})
const onClickPrevious = () => {
  let newDate
  switch (props.view) {
    case 'month':
      newDate = getMonthsAgo(props.activeStartDate, 1)
      break
    case 'year':
      newDate = getYearsAgo(props.activeStartDate, 1)
      break
    case 'decade':
      newDate = getYearsAgo(props.activeStartDate, 10)
      break
    case 'century':
      newDate = getYearsAgo(props.activeStartDate, 100)
      break
  }
  props.updateActiveStartDate(newDate)
}
const onClickPreviousDouble = () => {
  let newDate
  switch (props.view) {
    case 'month':
      newDate = getMonthsAgo(props.activeStartDate, 12)
      break
    case 'year':
      newDate = getYearsAgo(props.activeStartDate, 10)
      break
    case 'decade':
      newDate = getYearsAgo(props.activeStartDate, 100)
      break
  }
  props.updateActiveStartDate(newDate)
}
</script>

<template>
  <div class="vue-kalendar__navigation">
    <button v-if="view !== 'century'" @click="onClickPreviousDouble">«</button>
    <button @click="onClickPrevious">‹</button>
    <button
      @click="() => drillUp()"
      :disabled="view === 'century'"
      :style="{ flexGrow: 1 }"
    >
      <span>
        {{ label }}
      </span>
    </button>
    <button
      @click="() => updateActiveStartDate(nextActiveStartDate)"
      :disabled="maxDate ? nextActiveStartDate >= maxDate : false"
    >
      ›
    </button>
    <button
      v-if="view !== 'century'"
      @click="() => updateActiveStartDate(nextDoubleActiveStartDate)"
      :disabled="maxDate ? nextDoubleActiveStartDate >= maxDate : false"
    >
      »
    </button>
  </div>
</template>

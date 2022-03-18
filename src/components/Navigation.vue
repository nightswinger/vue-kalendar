<script setup lang="ts">
import { computed, inject } from 'vue'
import {
  getBeginOfCenturyYear,
  getBeginOfDecadeYear,
  getEndOfCenturyYear,
  getEndOfDecadeYear,
  getEndOfMonth,
  getEndOfYear,
  getMonthsAgo,
  getMonthsSince,
  getYearsAgo,
  getYearsSince
} from '../utils/dates'
import type { CalendarStore } from '../utils/hooks'
import { CalendarStoreKey } from '../utils/hooks'

const props = defineProps<{
  drillUp: Function
  updateActiveStartDate: Function
  view: string
}>()

const {
  activeStartDate,
  locale,
  maxDate,
  minDate,
  minDetail
} = inject(CalendarStoreKey) as CalendarStore

const formatMonthYear = (date: Date) => Intl.DateTimeFormat(locale.value, { month: 'long', year: 'numeric' }).format(date)
const formatYear = (date: Date) => Intl.DateTimeFormat(locale.value, { year: 'numeric' }).format(date)
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
      return formatMonthYear(activeStartDate.value)
    case 'year':
      return formatYear(activeStartDate.value)
    case 'decade':
      return formatDecadeYearLabel(activeStartDate.value)
    case 'century':
      return formatCenturyYearLabel(activeStartDate.value)
    default:
      throw new Error(`Invalid view: ${props.view}`)
  }
})

const nextActiveStartDate = computed(() => {
  switch (props.view) {
    case 'month':
      return getMonthsSince(activeStartDate.value, 1)
    case 'year':
      return getYearsSince(activeStartDate.value, 1)
    case 'decade':
      return getYearsSince(activeStartDate.value, 10)
    case 'century':
      return getYearsSince(activeStartDate.value, 100)
    default:
      throw new Error(`Invalid view: ${props.view}`)
  }
})
const nextDoubleActiveStartDate = computed(() => {
  switch (props.view) {
    case 'month':
      return getMonthsSince(activeStartDate.value, 12)
    case 'year':
      return getYearsSince(activeStartDate.value, 10)
    case 'decade':
      return getYearsSince(activeStartDate.value, 100)
    default:
      throw new Error(`Invalid view: ${props.view}`)
  }
})
const prevActiveStartDate = computed(() => {
  switch (props.view) {
    case 'month':
      return getMonthsAgo(activeStartDate.value, 1)
    case 'year':
      return getYearsAgo(activeStartDate.value, 1)
    case 'decade':
      return getYearsAgo(activeStartDate.value, 10)
    case 'century':
      return getYearsAgo(activeStartDate.value, 100)
    default:
      throw new Error(`Invalid view: ${props.view}`)
  }
})
const prevDoubleActiveStartDate = computed(() => {
  switch (props.view) {
    case 'month':
      return getMonthsAgo(activeStartDate.value, 12)
    case 'year':
      return getYearsAgo(activeStartDate.value, 10)
    case 'decade':
      return getYearsAgo(activeStartDate.value, 100)
    default:
      throw new Error(`Invalid view: ${props.view}`)
  }
})
const prevActiveEndDate = computed(() => {
  switch (props.view) {
    case 'month':
      return getEndOfMonth(prevActiveStartDate.value)
    case 'year':
      return getEndOfYear(prevActiveStartDate.value)
    case 'decade':
      return getEndOfDecadeYear(prevActiveStartDate.value)
    case 'century':
      return getEndOfCenturyYear(prevActiveStartDate.value)
    default:
      throw new Error(`Invalid view: ${props.view}`)
  }
})
const prevDoubleActiveEndDate = computed(() => {
  switch (props.view) {
    case 'month':
      return getEndOfMonth(prevDoubleActiveStartDate.value)
    case 'year':
      return getEndOfYear(prevDoubleActiveStartDate.value)
    case 'decade':
      return getEndOfDecadeYear(prevDoubleActiveStartDate.value)
    case 'century':
      return getEndOfCenturyYear(prevDoubleActiveStartDate.value)
    default:
      throw new Error(`Invalid view: ${props.view}`)
  }
})
</script>

<template>
  <div class="vue-kalendar__navigation">
    <button
      v-if="view !== 'century'"
      @click="() => updateActiveStartDate(prevDoubleActiveStartDate)"
      :disabled="minDate ? minDate >= prevDoubleActiveEndDate : false"
    >
      «
    </button>
    <button
      @click="() => updateActiveStartDate(prevActiveStartDate)"
      :disabled="minDate ? minDate >= prevActiveEndDate : false"
    >
      ‹
    </button>
    <button
      @click="() => drillUp()"
      :disabled="view === 'century' || view === minDetail"
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

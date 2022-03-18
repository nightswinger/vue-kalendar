<script setup lang="ts">
import { computed } from 'vue'
import { getDayOfWeek, getDaysInMonth } from '../utils/dates'
import Day from './Day.vue'
import TileGroup from './TileGroup.vue'

const props = defineProps<{
  activeStartDate: Date
  localeFirstDayOfYear?: number
  showNeighboringMonth?: boolean
}>()

const { ...otherProps } = props

const year = computed(() => props.activeStartDate.getFullYear())
const month = computed(() => props.activeStartDate.getMonth())

const dateTransform = (day: number) => {
  const date = new Date()
  date.setFullYear(year.value, month.value, day)
  date.setHours(0, 0, 0, 0)

  return date
}

const hasFixedNumberOfWeeks = false || props.showNeighboringMonth
const dayOfWeek = computed(() => getDayOfWeek(props.activeStartDate, props.localeFirstDayOfYear))

const offset = hasFixedNumberOfWeeks ? 0 : dayOfWeek.value

const start = computed(() => (hasFixedNumberOfWeeks ? -dayOfWeek.value : 0) + 1)

const end = computed(() => {
  const daysInMonth = getDaysInMonth(props.activeStartDate)

  if (props.showNeighboringMonth) {
    const activeEndDate = new Date()
    activeEndDate.setFullYear(year.value, month.value, daysInMonth)
    activeEndDate.setHours(0, 0, 0, 0)
    const daysUntilEndOfTheWeek = 7 - getDayOfWeek(activeEndDate, props.localeFirstDayOfYear) - 1

    return daysInMonth + daysUntilEndOfTheWeek
  }

  return daysInMonth
})
</script>

<template>
  <TileGroup
    v-bind="otherProps"
    :count="7"
    :current-month="month"
    :date-transform="dateTransform"
    :end="end"
    :offset="offset"
    :start="start"
    :tile="Day"
  />
</template>

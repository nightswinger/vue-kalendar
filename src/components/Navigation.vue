<script setup lang="ts">import { computed } from 'vue';
import { getMonthsAgo, getMonthsSince, getYearsAgo, getYearsSince } from '../utils/dates';

const props = defineProps<{
  activeStartDate: Date
  drillUp: Function
  updateActiveStartDate: Function
  view: string
}>()

const formatMonthYear = (date: Date) => Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)
const formatYear = (date: Date) => Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date)
const label = computed(() => {
  switch (props.view) {
    case 'month':
      return formatMonthYear(props.activeStartDate)
    case 'year':
      return formatYear(props.activeStartDate)
    default:
      throw new Error(`Invalid view: ${props.view}`)
  }
})

const onClickNext = () => {
  let newDate
  switch (props.view) {
    case 'month':
      newDate = getMonthsSince(props.activeStartDate, 1)
      break
    case 'year':
      newDate = getYearsSince(props.activeStartDate, 1)
      break
  }
  props.updateActiveStartDate(newDate)
}
const onClickNextDouble = () => {
  let newDate
  switch (props.view) {
    case 'month':
      newDate = getMonthsSince(props.activeStartDate, 12)
      break
    case 'year':
      newDate = getYearsSince(props.activeStartDate, 10)
      break
  }
  props.updateActiveStartDate(newDate)
}
const onClickPrevious = () => {
  let newDate
  switch (props.view) {
    case 'month':
      newDate = getMonthsAgo(props.activeStartDate, 1)
      break
    case 'year':
      newDate = getYearsAgo(props.activeStartDate, 1)
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
  }
  props.updateActiveStartDate(newDate)
}
</script>

<template>
  <div class="vue-kalendar__navigation">
    <button @click="onClickPreviousDouble">«</button>
    <button @click="onClickPrevious">‹</button>
    <button
      @click="() => drillUp()"
      :style="{ flexGrow: 1 }"
    >
      <span>
        {{ label }}
      </span>
    </button>
    <button @click="onClickNext">›</button>
    <button @click="onClickNextDouble">»</button>
  </div>
</template>

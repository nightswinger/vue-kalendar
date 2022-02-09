<script setup lang="ts">import { computed } from 'vue';
import { getMonthsAgo, getMonthsSince } from '../utils/dates';

const props = defineProps<{
  activeStartDate: Date
  updateActiveStartDate: Function
  view: string
}>()

const formatMonthYear = (date: Date) => Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)
const label = computed(() => {
  switch (props.view) {
    case 'month':
      return formatMonthYear(props.activeStartDate)
    default:
      throw new Error(`Invalid view: ${props.view}`)
  }
})

const onClickNext = () => {
  const newDate = getMonthsSince(props.activeStartDate, 1)
  props.updateActiveStartDate(newDate)
}
const onClickNextDouble = () => {
  const newDate = getMonthsSince(props.activeStartDate, 12)
  props.updateActiveStartDate(newDate)
}
const onClickPrevious = () => {
  const newDate = getMonthsAgo(props.activeStartDate, 1)
  props.updateActiveStartDate(newDate)
}
const onClickPreviousDouble = () => {
  const newDate = getMonthsAgo(props.activeStartDate, 12)
  props.updateActiveStartDate(newDate)
}
</script>

<template>
  <div class="vue-kalendar__navigation">
    <button @click="onClickPreviousDouble">«</button>
    <button @click="onClickPrevious">‹</button>
    <button
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

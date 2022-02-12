<script setup lang="ts">
import Flex from './Flex.vue';
defineProps<{
  activeStartDate: Date
  count: number
  currentMonth?: number
  dateTransform: Function
  end: number
  offset?: number
  start: number
  step?: number
  tile: any
}>()

const range = (start: number, end: number, step = 1) => {
  const result = []
  for (let i = start; i <= end; i += step) {
    result.push(i)
  }
  return result
}
</script>

<template>
  <Flex :count="count" :offset="offset" wrap>
    <component
      v-for="point in range(start, end, step)"
      :is="tile"
      :current-month="currentMonth"
      :date="dateTransform(point)"
    />
  </Flex>
</template>

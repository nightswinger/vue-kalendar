<script setup lang="ts">
import Flex from './Flex.vue';
defineProps<{
  activeStartDate: Date
  count: number
  dateTransform: Function
  end: number
  offset?: number
  start: number
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
      v-for="point in range(start, end)"
      :is="tile"
      :date="dateTransform(point)"
    />
  </Flex>
</template>

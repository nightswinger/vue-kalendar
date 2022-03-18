<script setup lang="ts">
import { computed } from 'vue'
import { getBeginOfDecadeYear } from '../utils/dates'
import TileGroup from './TileGroup.vue'
import Year from './Year.vue'

const props = defineProps<{
  activeStartDate: Date
}>()

const start = computed(() => {
  const date = getBeginOfDecadeYear(props.activeStartDate)
  return date.getFullYear()
})
const end = computed(() => start.value + 9)

const dateTransform = (year: number) => {
  const date = new Date()
  date.setFullYear(year, 0, 1)
  date.setHours(0, 0, 0, 0)

  return date
}
</script>

<template>
  <TileGroup
    v-bind="props"
    :count="3"
    :date-transform="dateTransform"
    :end="end"
    :start="start"
    :tile="Year"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getBeginOfCenturyYear } from '../utils/dates';
import Decade from './Decade.vue';
import TileGroup from './TileGroup.vue';

const props = defineProps<{
  activeStartDate: Date
}>()

const start = computed(() => {
  const date = getBeginOfCenturyYear(props.activeStartDate)
  return date.getFullYear()
})
const end = computed(() => start.value + 99)

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
    :step="10"
    :tile="Decade"
  />
</template>

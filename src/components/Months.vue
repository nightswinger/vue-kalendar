<script setup lang="ts">import { computed } from 'vue'
import Month from './Month.vue'
import TileGroup from './TileGroup.vue'

const props = defineProps<{
  activeStartDate: Date
}>()

const start = 0
const end = 11
const year = computed(() => props.activeStartDate.getFullYear())

const dateTransform = (month: number) => {
  const date = new Date()
  date.setFullYear(year.value, month, 1)
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
    :tile="Month"
  />
</template>

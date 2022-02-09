<script setup lang="ts">
import { getBeginOfMonth, getDayOfWeek } from '../utils/dates';
import Flex from './Flex.vue';

defineProps()

const anyDate = new Date()
const beginOfMonth = getBeginOfMonth(anyDate)
const year = beginOfMonth.getFullYear()
const month = beginOfMonth.getMonth()

const weekdayDate = (i: number) => new Date(year, month, i - getDayOfWeek(beginOfMonth))
const formatWeekday = (date: Date) => Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
const formatShortWeekday = (date: Date) => Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)
</script>

<template>
  <Flex class="vue-kalendar__month-view__weekdays" :count="7">
    <div
      v-for="weekday in 7"
      :key="weekday"
    >
      <abbr
        :aria-label="formatWeekday(weekdayDate(weekday))"
        :title="formatWeekday(weekdayDate(weekday))"
      >
        {{ formatShortWeekday(weekdayDate(weekday)) }}
      </abbr>
    </div>
  </Flex>
</template>

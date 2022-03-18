<script setup lang="ts">
import { inject } from 'vue'
import { getBeginOfMonth, getDayOfWeek } from '../utils/dates'
import type { CalendarStore } from '../utils/hooks'
import { CalendarStoreKey } from '../utils/hooks'
import Flex from './Flex.vue'

const props = defineProps<{
  localeFirstDayOfYear?: number
}>()

const { locale } = inject(CalendarStoreKey) as CalendarStore

const anyDate = new Date()
const beginOfMonth = getBeginOfMonth(anyDate)
const year = beginOfMonth.getFullYear()
const month = beginOfMonth.getMonth()

const weekdayDate = (i: number) => new Date(year, month, i - getDayOfWeek(beginOfMonth, props.localeFirstDayOfYear))
const formatWeekday = (date: Date) => Intl.DateTimeFormat(locale.value, { weekday: 'long' }).format(date)
const formatShortWeekday = (date: Date) => Intl.DateTimeFormat(locale.value, { weekday: 'short' }).format(date)
</script>

<template>
  <Flex class="vue-kalendar__month-view__weekdays" :count="7">
    <div
      v-for="weekday in 7"
      class="vue-kalendar__month-view__weekdays__weekday"
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

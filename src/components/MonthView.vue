<script setup lang="ts">
import { inject } from 'vue'
import WeekNumbers from './WeekNumbers.vue'
import WeekDays from './WeekDays.vue'
import Days from './Days.vue'
import type { CalendarStore } from '../utils/hooks'
import { CalendarStoreKey } from '../utils/hooks'

defineProps<{
  localeFirstDayOfYear: number
  showNeighboringMonth: boolean
  showWeekNumbers?: boolean
}>()

const {
  activeStartDate
} = inject(CalendarStoreKey) as CalendarStore
</script>

<template>
  <div class="vue-kalendar__month-view">
    <div :style="{ display: 'flex', alignItems: 'flex-end' }">
      <WeekNumbers
        v-if="showWeekNumbers"
        :active-start-date="activeStartDate"
      />
      <div
        :style="{
          flexGrow: 1,
          width: '100%'
        }"
      >
        <WeekDays :locale-first-day-of-year="localeFirstDayOfYear" />
        <Days
          :active-start-date="activeStartDate"
          :locale-first-day-of-year="localeFirstDayOfYear"
          :show-neighboring-month="showNeighboringMonth"
        />
      </div>
    </div>
  </div>
</template>

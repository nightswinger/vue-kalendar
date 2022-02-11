<script setup lang="ts">
import WeekNumbers from './WeekNumbers.vue';
import WeekDays from './WeekDays.vue';
import Days from './Days.vue';

defineProps<{
  activeStartDate: Date
  localeFirstDayOfYear: number
  showNeighboringMonth: boolean
  showWeekNumbers?: boolean
}>()
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

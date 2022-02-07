<script setup lang="ts">
import WeekNumbers from './WeekNumbers.vue';
import WeekDays from './WeekDays.vue';
import Days from './Days.vue';

defineProps<{
  activeStartDate: Date
  showNeighboringMonth: boolean
  showWeekNumbers?: boolean
}>()
</script>

<template>
  <div>
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
        <WeekDays />
        <Days
          :active-start-date="activeStartDate"
          :show-neighboring-month="showNeighboringMonth"
        />
      </div>
    </div>
  </div>
</template>

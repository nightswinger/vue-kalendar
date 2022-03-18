<script setup lang="ts">
import { inject } from 'vue'
import Months from './Months.vue'
import type { CalendarStore } from '../utils/hooks'
import { CalendarStoreKey } from '../utils/hooks'

const {
  activeStartDate
} = inject(CalendarStoreKey) as CalendarStore
</script>

<template>
  <div class="vue-kalendar__year-view">
    <Months :active-start-date="activeStartDate" />
  </div>
</template>

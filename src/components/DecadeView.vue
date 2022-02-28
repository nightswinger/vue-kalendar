<script setup lang="ts">
import { inject } from 'vue';
import Years from './Years.vue';
import type { CalendarStore } from '../utils/hooks';
import { CalendarStoreKey } from '../utils/hooks';

const {
  activeStartDate,
} = inject(CalendarStoreKey) as CalendarStore
</script>

<template>
  <div class="vue-kalendar__decade-view">
    <Years :active-start-date="activeStartDate" />
  </div>
</template>

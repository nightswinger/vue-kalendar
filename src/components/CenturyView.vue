<script setup lang="ts">
import { inject } from 'vue';
import Decades from './Decades.vue';
import type { CalendarStore } from '../utils/hooks';
import { CalendarStoreKey } from '../utils/hooks';

const {
  activeStartDate,
} = inject(CalendarStoreKey) as CalendarStore
</script>

<template>
  <div class="vue-kalendar__century-view">
    <Decades :active-start-date="activeStartDate" />
  </div>
</template>

<script setup lang="ts">
import { getBeginOfMonth } from '../utils/dates';
import MonthView from './MonthView.vue';

const props = defineProps({
  showNeighboringMonth: { type: Boolean, default: true }
})

const activeStartDate = getBeginOfMonth(new Date())
</script>

<template>
  <div class="kalendar">
    <div>
      <MonthView
        :active-start-date="activeStartDate"
        v-bind="{...props}"
      />
    </div>
  </div>
</template>

<style scoped>
.kalendar {
  width: 350px;
  max-width: 100%;
  background: white;
  border: 1px solid rgb(160, 160, 150);
  line-height: 1.125rem;
}
</style>
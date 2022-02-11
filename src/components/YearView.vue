<script setup lang="ts">
import Months from './Months.vue';

defineProps<{ activeStartDate: Date }>()
</script>

<template>
  <div class="vue-kalendar__year-view">
    <Months :active-start-date="activeStartDate" />
  </div>
</template>

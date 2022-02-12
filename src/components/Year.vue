<script setup lang="ts">
defineProps<{
  date: Date
}>()

const formatYear = (date: Date) => Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date)
</script>

<template>
  <div  class="vue-kalendar__tile vue-kalendar__decade-view__years__year">
    {{ formatYear(date) }}
  </div>
</template>

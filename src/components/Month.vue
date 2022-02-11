<script setup lang="ts">
defineProps<{
  date: Date
}>()

const formatMonth = (date: Date) => Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
</script>

<template>
  <div class="vue-kalendar__tile vue-kalendar__year-view__months__month">
    {{ formatMonth(date) }}
  </div>
</template>

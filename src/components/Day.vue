<script setup lang="ts">
defineProps<{
  date: Date
}>()

const formatDay = (date: Date) => Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)
</script>

<template>
  <div>{{ formatDay(date) }}</div>
</template>

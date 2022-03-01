<script setup lang="ts">
defineProps<{ weekNumber: number }>()
</script>

<template>
  <div class="vue-kalendar__tile">{{ weekNumber }}</div>
</template>

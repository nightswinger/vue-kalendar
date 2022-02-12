<script setup lang="ts">
import Years from './Years.vue';

defineProps<{ activeStartDate: Date }>()
</script>

<template>
  <div class="vue-kalendar__decade-view">
    <Years :active-start-date="activeStartDate" />
  </div>
</template>

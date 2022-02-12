<script setup lang="ts">
import Decades from './Decades.vue';

defineProps<{ activeStartDate: Date }>()
</script>

<template>
  <div class="vue-kalendar__century-view">
    <Decades :active-start-date="activeStartDate" />
  </div>
</template>

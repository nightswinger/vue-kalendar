<script setup lang="ts">import { computed } from 'vue';

const props = defineProps<{ classes: any }>()

const computedClass = computed(() => {
  return [
    'vue-kalendar__tile',
    ...props.classes
  ]
})
</script>

<template>
  <button
    :class="computedClass"
    type="button"
  >
    <slot></slot>
  </button>
</template>

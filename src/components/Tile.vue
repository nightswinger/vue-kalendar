<script setup lang="ts">import { computed } from 'vue'

const props = defineProps<{
  classes: any
  disabled?: boolean
}>()

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
    :disabled="disabled"
    type="button"
  >
    <slot />
  </button>
</template>

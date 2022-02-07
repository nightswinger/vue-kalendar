<script setup lang="ts">
const props = defineProps<{
  count: number
  offset?: number
  wrap?: boolean
}>()

const flexBasis = `${100 / props.count}%`
const flexWrap = props.wrap ? 'wrap' : 'nowrap'
const marginLeft = props.offset ? `${(100 * props.offset) / props.count}%` : null
</script>

<template>
  <div class="flex">
    <slot></slot>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  flex-wrap: v-bind(flexWrap);
}
:slotted(*) {
  flex-basis: v-bind(flexBasis);
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;
}
:slotted(*:first-child) {
  margin-left: v-bind(marginLeft);
}
</style>

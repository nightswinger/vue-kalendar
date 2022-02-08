<script setup lang="ts">import { computed } from 'vue';

const props = defineProps<{
  activeStartDate: Date
  view: string
}>()

const formatMonthYear = (date: Date) => Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)
const label = computed(() => {
  switch (props.view) {
    case 'month':
      return formatMonthYear(props.activeStartDate)
    default:
      throw new Error(`Invalid view: ${props.view}`)
  }
})
</script>

<template>
  <div>
    <button>«</button>
    <button>‹</button>
    <button>
      <span>
        {{ label }}
      </span>
    </button>
    <button>›</button>
    <button>»</button>
  </div>
</template>

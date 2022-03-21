<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue'

const props = defineProps<{
  count: number
  offset?: number
  wrap?: boolean
}>()

const flexBasis = `${100 / props.count}%`
const flexWrap = props.wrap ? 'wrap' as const : 'nowrap' as const
const marginLeft = props.offset ? `${(100 * props.offset) / props.count}%` : null

const root = ref<HTMLElement | null>(null)
const styleChildComponents = () => {
  if (!root.value) return

  const { children } = root.value
  Array.from(children as HTMLCollectionOf<HTMLElement>).forEach((child, index) => {
    child.style.flexBasis = flexBasis
    child.style.flexGrow = '0'
    child.style.flexShrink = '0'
    child.style.overflow = 'hidden'

    if (index === 0 && marginLeft) child.style.marginLeft = marginLeft
  })
}
onMounted(() => styleChildComponents())
onUpdated(() => styleChildComponents())
</script>

<template>
  <div
    ref="root"
    :style="{ display: 'flex', flexWrap: flexWrap }"
  >
    <slot />
  </div>
</template>

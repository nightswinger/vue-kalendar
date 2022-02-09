<script setup lang="ts">
import { computed, reactive } from 'vue';
import { getBeginOfMonth } from '../utils/dates';
import MonthView from './MonthView.vue';
import Navigation from './Navigation.vue';

const props = defineProps({
  maxDetail: { type: String, default: 'month' },
  minDetail: { type: String, default: 'century' },
  showNavigation: { type: Boolean, default: true },
  showNeighboringMonth: { type: Boolean, default: true }
})

const state = reactive({
  value: new Date(),
  view: ''
})

const activeStartDate = computed(() => {
  switch(view.value) {
    case 'month':
      return getBeginOfMonth(state.value)
    default:
      throw new Error(`Invalid view: ${view.value}`)
  }
})
const updateActiveStartDate = (date: Date) => state.value = date

const allViews = ['century', 'decade', 'year', 'month']
const view = computed(() => {
  const limitedViews = allViews.slice(
    allViews.indexOf(props.minDetail),
    allViews.indexOf(props.maxDetail) + 1
  )

  if (limitedViews.indexOf(state.view) !== -1) {
    return state.view
  }
  return props.maxDetail
})
</script>

<template>
  <div class="kalendar">
    <Navigation
      :active-start-date="activeStartDate"
      :update-active-start-date="updateActiveStartDate"
      :view="view"
    />
    <div>
      <MonthView
        :active-start-date="activeStartDate"
        v-bind="{...props}"
      />
    </div>
  </div>
</template>

<style scoped>
.kalendar {
  width: 350px;
  max-width: 100%;
  background: white;
  border: 1px solid rgb(160, 160, 150);
  line-height: 1.125rem;
}
</style>
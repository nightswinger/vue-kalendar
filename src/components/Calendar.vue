<script setup lang="ts">
import { computed, reactive } from 'vue';
import { getBeginOfMonth, getBeginOfYear } from '../utils/dates';
import MonthView from './MonthView.vue';
import Navigation from './Navigation.vue';
import YearView from './YearView.vue';

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
    case 'year':
      return getBeginOfYear(state.value)
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

const drillUp = () => {
  const limitedViews = allViews.slice(
    allViews.indexOf(props.minDetail),
    allViews.indexOf(props.maxDetail) + 1
  )

  const nextView = limitedViews[limitedViews.indexOf(view.value) - 1]
  state.view = nextView
}
</script>

<template>
  <div class="vue-kalendar">
    <Navigation
      :active-start-date="activeStartDate"
      :drill-up="drillUp"
      :update-active-start-date="updateActiveStartDate"
      :view="view"
    />
    <div>
      <MonthView
        v-if="view === 'month'"
        :active-start-date="activeStartDate"
        v-bind="{...props}"
      />
      <YearView
        v-if="view === 'year'"
        :active-start-date="activeStartDate"
        v-bind="{...props}"
      />
    </div>
  </div>
</template>

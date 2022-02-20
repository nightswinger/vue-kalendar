<script setup lang="ts">
import { computed, provide, reactive, watchEffect } from 'vue';
import { getBeginOfCenturyYear, getBeginOfDecadeYear, getBeginOfMonth, getBeginOfYear } from '../utils/dates';
import MonthView from './MonthView.vue';
import Navigation from './Navigation.vue';
import YearView from './YearView.vue';
import DecadeView from './DecadeView.vue';
import CenturyView from './CenturyView.vue';
import { CalendarStoreKey, useCalendar } from '../utils/hooks';

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  localeFirstDayOfYear: { type: Number, default: 0 },
  maxDetail: { type: String, default: 'month' },
  minDetail: { type: String, default: 'century' },
  modelValue: { type: Date },
  showNavigation: { type: Boolean, default: true },
  showNeighboringMonth: { type: Boolean, default: true }
})

const store = useCalendar(props)
provide(CalendarStoreKey, store)

const { value } = store

watchEffect(() => emit('update:modelValue', value.value))

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
    case 'decade':
      return getBeginOfDecadeYear(state.value)
    case 'century':
      return getBeginOfCenturyYear(state.value)
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
      <DecadeView
        v-if="view === 'decade'"
        :active-start-date="activeStartDate"
        v-bind="{...props}"
      />
      <CenturyView
        v-if="view === 'century'"
        :active-start-date="activeStartDate"
        v-bind="{...props}"
      />
    </div>
  </div>
</template>

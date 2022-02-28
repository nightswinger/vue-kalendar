<script setup lang="ts">
import { provide, watchEffect } from 'vue';
import MonthView from './MonthView.vue';
import Navigation from './Navigation.vue';
import YearView from './YearView.vue';
import DecadeView from './DecadeView.vue';
import CenturyView from './CenturyView.vue';
import { CalendarStoreKey, useCalendar } from '../utils/hooks';

const emit = defineEmits(['update:modelValue'])

const props = withDefaults(defineProps<{
  activeStartDate?: Date
  locale?: string
  localeFirstDayOfYear?: number
  maxDate?: Date
  maxDetail?: string
  minDate?: Date
  minDetail?: string
  modelValue?: Date
  showNavigation?: boolean
  showNeighboringMonth?: boolean
}>(), {
  localeFirstDayOfYear: 0,
  maxDetail: 'month',
  minDetail: 'century',
  showNavigation: true,
  showNeighboringMonth: true
})

const store = useCalendar(props)
provide(CalendarStoreKey, store)

const {
  updateActiveStartDate,
  value,
  view,
  limitedViews,
  updateView
} = store

watchEffect(() => emit('update:modelValue', value.value))

const drillUp = () => {
  const nextView = limitedViews[limitedViews.indexOf(view.value) - 1]
  updateView(nextView)
}
</script>

<template>
  <div class="vue-kalendar">
    <Navigation
      :drill-up="drillUp"
      :update-active-start-date="updateActiveStartDate"
      :view="view"
    />
    <div>
      <MonthView
        v-if="view === 'month'"
        v-bind="{...props}"
      />
      <YearView
        v-if="view === 'year'"
        v-bind="{...props}"
      />
      <DecadeView
        v-if="view === 'decade'"
        v-bind="{...props}"
      />
      <CenturyView
        v-if="view === 'century'"
        v-bind="{...props}"
      />
    </div>
  </div>
</template>

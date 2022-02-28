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
  activeStartDate,
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

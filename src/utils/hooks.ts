import { computed, InjectionKey, reactive } from 'vue'
import {
  getBeginOfCenturyYear,
  getBeginOfDecadeYear,
  getBeginOfMonth,
  getBeginOfYear,
  getEndOfDay,
  getEndOfDecadeYear,
  getEndOfMonth,
  getEndOfYear
} from '../utils/dates'

export type CalendarStore = ReturnType<typeof useCalendar>

export const CalendarStoreKey: InjectionKey<CalendarStore> = Symbol('CalendarStore')

function getEndDate (date: Date, view: string = 'month') {
  switch (view) {
    case 'month':
      return getEndOfDay(date)
    case 'year':
      return getEndOfMonth(date)
    case 'decade':
      return getEndOfYear(date)
    case 'century':
      return getEndOfDecadeYear(date)
    default:
      throw new Error(`Invalid view: ${view}`)
  }
}

export function useCalendar (props: any) {
  const state = reactive({
    activeStartDate: props.activeStartDate || new Date(),
    value: props.selectRange ? [...props.modelValue] : props.modelValue || new Date(),
    view: props.defaultView
  })

  const activeStartDate = computed(() => {
    switch (view.value) {
      case 'month':
        return getBeginOfMonth(state.activeStartDate)
      case 'year':
        return getBeginOfYear(state.activeStartDate)
      case 'decade':
        return getBeginOfDecadeYear(state.activeStartDate)
      case 'century':
        return getBeginOfCenturyYear(state.activeStartDate)
      default:
        throw new Error(`Invalid view: ${view.value}`)
    }
  })
  const updateActiveStartDate = (date: Date) => (state.activeStartDate = date)

  const value = computed(() => state.value)
  const isRange = computed(() => !!props.selectRange)
  const isDateInRange = (range: Date[]) => {
    if (!value.value) return false

    const [begin, end] = range
    if (!isRange.value) return begin <= value.value && end >= value.value

    const [from, to] = value.value
    return (begin <= from && end >= from) || (from <= begin && to >= end)
  }

  const updateValue = (date: Date) => {
    if (!isRange.value) return (state.value = date)

    if (state.value.length === 1) {
      const [begin] = state.value
      state.value = begin < date
        ? [begin, getEndDate(date, props.maxDetail)]
        : [date, getEndDate(begin, props.maxDetail)]
    } else {
      state.value = [date]
    }
  }

  const allViews = ['century', 'decade', 'year', 'month']
  const limitedViews = allViews.slice(
    allViews.indexOf(props.minDetail),
    allViews.indexOf(props.maxDetail) + 1
  )
  const view = computed(() => {
    if (limitedViews.indexOf(state.view) !== -1) {
      return state.view
    }
    return props.maxDetail
  })
  const updateView = (v: string) => (state.view = v)

  const maxDetail = computed(() => props.maxDetail)
  const minDetail = computed(() => props.minDetail)

  const locale = computed(() => props.locale ? props.locale : new Intl.DateTimeFormat().resolvedOptions().locale)

  const maxDate = computed(() => props.maxDate)
  const minDate = computed(() => props.minDate)

  return {
    activeStartDate,
    isDateInRange,
    isRange,
    locale,
    maxDate,
    maxDetail,
    minDate,
    minDetail,
    updateActiveStartDate,
    value,
    updateValue,
    view,
    limitedViews,
    updateView
  }
}

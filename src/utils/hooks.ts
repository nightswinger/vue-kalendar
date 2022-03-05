import { computed, InjectionKey, reactive } from "vue";
import { getBeginOfCenturyYear, getBeginOfDecadeYear, getBeginOfMonth, getBeginOfYear } from '../utils/dates';

export type CalendarStore = ReturnType<typeof useCalendar>

export const CalendarStoreKey: InjectionKey<CalendarStore> = Symbol('CalendarStore')

export function useCalendar(props: any) {
  const state = reactive({
    activeStartDate: props.activeStartDate || new Date(),
    value: props.modelValue || new Date(),
    view: ''
  })

  const activeStartDate = computed(() => {
    switch(view.value) {
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
  const updateActiveStartDate = (date: Date) => state.activeStartDate = date

  const value = computed(() => state.value)
  const updateValue = (date: Date) => state.value = date

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
  const updateView = (v: string) => state.view = v

  const maxDetail = computed(() => props.maxDetail)
  const minDetail = computed(() => props.minDetail)

  const locale = computed(() => props.locale ? props.locale : new Intl.DateTimeFormat().resolvedOptions().locale)

  const maxDate = computed(() => props.maxDate)
  const minDate = computed(() => props.minDate)

  return {
    activeStartDate,
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

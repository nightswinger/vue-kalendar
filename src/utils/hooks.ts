import { computed, InjectionKey, reactive } from "vue";

export type CalendarStore = ReturnType<typeof useCalendar>

export const CalendarStoreKey: InjectionKey<CalendarStore> = Symbol('CalendarStore')

export function useCalendar(props: any) {
  const state = reactive({
    value: props.modelValue
  })

  const value = computed(() => state.value)
  const updateValue = (date: Date) => state.value = date

  return {
    value,
    updateValue
  }
}

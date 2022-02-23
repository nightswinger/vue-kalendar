import { shallowMount } from '@vue/test-utils'
import Calendar from '../Calendar.vue'
import Navigation from '../Navigation.vue'

describe('Calendar', () => {
  it('renders Navigation by default', () => {
    const wrapper = shallowMount(Calendar)
    const navigation = wrapper.findComponent(Navigation)

    expect(navigation.exists()).toBe(true)
  })
})

import { getDayOfWeek, getWeekNumber } from "../dates"

describe('getDayOfWeek', () => {
  it('returns proper day of the week', () => {
    const date = new Date(2022, 0, 1)
    const dayOfWeek = getDayOfWeek(date)

    expect(dayOfWeek).toBe(5)
  })
})

describe('getWeekNumber', () => {
  it('returns proper week number for a sample week 1', () => {
    const year = 2022
    const month = 0
    const startDate = 3

    for(let currentDate = startDate; currentDate < startDate + 7; currentDate += 1) {
      const date = new Date(year, month, currentDate)
      const weekNumber = getWeekNumber(date)

      expect(weekNumber).toBe(1)
    }
  })

  it('returns proper week number for a sample year starting in week 1', () => {
    const year = 2022
    const month = 0
    const startDate = 3

    for (let currentWeek = 1; currentWeek <= 52; currentWeek += 1) {
      const weekOffset = (currentWeek - 1) * 7
      const date = new Date(year, month, startDate + weekOffset)

      const weekNumber = getWeekNumber(date)

      expect(weekNumber).toBe(currentWeek)
    }
  })
})

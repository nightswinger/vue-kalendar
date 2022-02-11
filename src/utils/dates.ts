export function getBeginOfMonth(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  
  return new Date(year, month, 1, 0, 0, 0, 0)
}

export function getBeginOfYear(date: Date) {
  const year = date.getFullYear()

  return new Date(year, 0, 1, 0, 0, 0, 0)
}

export function getBeginOfWeek(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate() - getDayOfWeek(date)

  return new Date(year, month, day)
}

export function getDayOfWeek(date: Date) {
  const weekday = date.getDay()
  return (weekday + 6) % 7
}

export function getDaysInMonth(date: Date) {
  return getEndOfMonth(date).getDate()
}

export function getMonthsAgo(date: Date, n: number) {
  const result = new Date(date.getTime())
  const month = result.getMonth()
  result.setMonth(month - n)

  return result
}

export function getMonthsSince(date: Date, n: number) {
  const result = new Date(date.getTime())
  const month = result.getMonth()
  result.setMonth(month + n)

  return result
}

export function getWeekNumber(date: Date) {
  const beginOfWeek = getBeginOfWeek(date)
  let year = date.getFullYear() + 1
  let dayInWeekOne
  let beginOfFirstWeek

  do {
    dayInWeekOne = new Date(year, 0, 4)
    beginOfFirstWeek = getBeginOfWeek(dayInWeekOne)
    year -= 1
  } while (date < beginOfFirstWeek)

  return Math.round((beginOfWeek.getTime() - beginOfFirstWeek.getTime()) / (8.64e7 * 7)) + 1
}

export function getYearsAgo(date: Date, n: number) {
  const result = new Date(date.getTime())
  const year = result.getFullYear()
  result.setFullYear(year - n)

  return result
}

export function getYearsSince(date: Date, n: number) {
  const result = new Date(date.getTime())
  const year = result.getFullYear()
  result.setFullYear(year + n)

  return result
}

function getEndOfMonth(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const beginOfNextMonth = new Date(year, month, 1, 0, 0, 0, 0)

  return new Date(beginOfNextMonth.getTime() - 1)
}

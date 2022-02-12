export function getBeginOfCenturyYear(date: Date) {
  const year = date.getFullYear()
  const centuryYear = year + ((-year + 1) % 100)

  const newDate = new Date()
  newDate.setFullYear(centuryYear, 0, 1)
  newDate.setHours(0, 0, 0, 0)

  return newDate
}

export function getBeginOfDecadeYear(date: Date) {
  const year = date.getFullYear()
  const decadeYear = year + ((-year + 1) % 10)

  const newDate = new Date()
  newDate.setFullYear(decadeYear, 0, 1)
  newDate.setHours(0, 0, 0, 0)
  
  return newDate
}

export function getBeginOfMonth(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  
  return new Date(year, month, 1, 0, 0, 0, 0)
}

export function getBeginOfYear(date: Date) {
  const year = date.getFullYear()

  return new Date(year, 0, 1, 0, 0, 0, 0)
}

export function getBeginOfWeek(date: Date, i: number = 0) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate() - getDayOfWeek(date, i)

  return new Date(year, month, day)
}

export function getDayOfWeek(date: Date, i: number = 0) {
  const weekday = date.getDay()
  return (weekday + i) % 7
}

export function getDaysInMonth(date: Date) {
  return getEndOfMonth(date).getDate()
}

export function getEndOfCenturyYear(date: Date) {
  const nextCenturyYear = getYearsSince(date, 100)

  return new Date(nextCenturyYear.getTime() - 1)
}

export function getEndOfDecadeYear(date: Date) {
  const nextDecadeYear = getYearsSince(date, 10)

  return new Date(nextDecadeYear.getTime() - 1)
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

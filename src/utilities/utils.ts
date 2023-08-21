export function formatDate(date: Date) {
  const day = ('0' + date.getDate().toString()).slice(-2)
  const month = ('0' + (date.getMonth() + 1).toString()).slice(-2)
  return `${date.getFullYear()}-${month}-${day}`
}

export function getWeek(currentDate: Date) {
  // Current date minus the current day of the week is Sunday
  const first = currentDate.getDate() - currentDate.getDay()
  // Sunday plus 6 is Saturday
  const last = first + 6

  const firstDay = formatDate(new Date(currentDate.setDate(first)))
  const lastDay = formatDate(new Date(currentDate.setDate(last)))

  return { firstDay, lastDay }
}

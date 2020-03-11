import { groupBy, chain } from 'lodash'
import { startOfWeek, addDays, formatISO } from 'date-fns'

export const groupByVenue = events => {
  return events
    .chain(filteredEvents)
    .groupBy(result => result.dates.start.localDate)
    .map((events, key) => ({ date: key, events: events }))
}

export const dateRangesForApi = () => {
  const formatDate = date => {
    return formatISO(date)
  }
  let start = startOfWeek(new Date(), 1)
  let end = addDays(start, 14)
  let startFormat = formatDate(start)
  let endFormat = formatDate(end)
  let dateRange = startFormat + ',' + endFormat
  let editedDate = dateRange.replace(/Z/g, '')
  return editedDate
}

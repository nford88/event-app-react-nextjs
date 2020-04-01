import { groupBy, chain } from 'lodash'
import { startOfWeek, addDays, formatISO } from 'date-fns'

export const groupByVenue = events => {
  return events
    .chain(filteredEvents)
    .groupBy(result => result.dates.start.localDate)
    .map((events, key) => ({ date: key, events: events }))
}

export const dateRangesForTicketMasterApi = () => {
  let start = startOfWeek(new Date(), 1)
  let end = addDays(start, 15)
  let dateRange = formatISO(start) + ',' + formatISO(end)
  let editedDate = dateRange.replace(/Z/g, '')
  return editedDate
}

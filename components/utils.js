import { groupBy, chain } from 'lodash'

export const groupByVenue = events => {
  return events
    .chain(filteredEvents)
    .groupBy(result => result.dates.start.localDate)
    .map((events, key) => ({ date: key, events: events }))
    .value()
}

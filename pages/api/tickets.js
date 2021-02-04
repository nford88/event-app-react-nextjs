const querystring = require('querystring')
const fetch = require('node-fetch')
const isBefore = require('date-fns/isBefore')
import { groupBy, chain } from 'lodash'
import { dateRangesForTicketMasterApi } from '../../components/utils'
import localData from './events.json'

export let cachedData = [];

const handler = async (req, res) => {
  let modifiedData = [];
  console.warn(process.env.LOCAL_DATA);
  if (process.env.LOCAL_DATA == 'true'){
    const { events } = localData
    cachedData =  events ;
    modifiedData = formatEventResults(events);
  }
  else {
    const { _embedded } = await fetchEventData()
    cachedData = { ..._embedded.events };
    const apiData = _embedded.events.filter(event => {
      return isBefore(new Date(), new Date(event.dates.start.dateTime))
    })
    modifiedData = formatEventResults(apiData);
  }
  return res.status(200).json(modifiedData)
}

const fetchEventData = () => {
  const params = {
    apikey: process.env.TM_API_TOKEN,
    sort: 'date,name,asc',
    size: '200',
    geoPoint: 'gc7x7q',
    radius: '15',
    unit: 'km',
    localStartDateTime: dateRangesForTicketMasterApi()
  }
  let queryString = querystring.stringify(params)
  if (cachedData.length === 0) {
    cachedData = fetch('https://app.ticketmaster.com/discovery/v2/events.json?' + queryString).then(r => r.json())
  }
  return cachedData;
}

const formatEventResults = (events) => {
  const sorted = chain(events)
    .groupBy(result => result.dates.start.localDate)
    .map((events, key) => ({ date: key, events: events }))
    .value()
  return sorted
}

export default handler;

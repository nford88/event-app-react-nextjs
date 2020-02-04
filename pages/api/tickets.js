const querystring = require('querystring')
const fetch = require('node-fetch')
const isBefore = require('date-fns/isBefore')

const fetchApi = () => {
  const API_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?'
  const params = {
    apikey: 'bQ8tC2OMgdsB5mWdbNGEGR3d1V1bTc5v',
    countryCode: 'IE',
    sort: 'date,name,asc',
    size: '200'
  }
  let queryString = querystring.stringify(params)
  console.log(API_URL + queryString)
  return fetch(API_URL + queryString).then(r => r.json())
}

const formatEventResults = data => {
  const filteredEvents = data['_embedded'].events

  return filteredEvents.filter(event => {
    const bannedVenue =
      event._embedded.venues[0].url ===
      'https://www.ticketmaster.ie/Wicklows-Historic-Gaol-tickets-Wicklow/venue/199838'
        ? true
        : false
    return (
      isBefore(new Date(), new Date(event.dates.start.dateTime)) && !bannedVenue
    )
  })
}

const handler = async (req, res) => {
  const data = await fetchApi()
  const modifiedData = await formatEventResults(data)
  // console.log(modifiedData)
  return res.status(200).json(modifiedData)
}
export default handler

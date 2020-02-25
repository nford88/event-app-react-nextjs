import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import fetch from 'isomorphic-unfetch'
import useSWR from 'swr'
import Spinner from '../components/Spinner'
import { format as dateFormat } from 'date-fns'



const fetcher = url => fetch(url).then(r => r.json())

const Index = props => {
  const { data } = useSWR('/api/tickets', fetcher)

  if (!data) return <Spinner />

  return (
    <Container className="defaultContainerBody">
      {data.map((day, index) => (
        <Row className="eventDateBlock justify-content-center">
          <Col xs="12" lg="10">
            <Row className="date-container">
              <Col className="day">{dateFormat(new Date(day.date), 'EEE do MMM')}</Col>
            </Row>
            <Events events={day.events} />
          </Col>
        </Row>
      ))
      }
    </Container >
  )
}

const Events = props => {
  const { events } = props
  return events.map((event, index) => (
    <Row className="eventRow" key={index + event.dates.start.localDate}>
      <Col xs="12">
        <Row>
          <Col xs="2" className="eventImageContainer">
            <Image
              eventImages={event.images}
              alt={event.name + event.dates.start.localDate}
            />
          </Col>
          <Col xs="9">
            <Row className="eventDetailBlock">
              <Col>
                <div className="eventName_container">
                  <a href={event.url} target="_blank">
                    <h6>{event.name}</h6>
                  </a>
                </div>
                <div className="eventVenue">
                  <p>{event._embedded.venues[0].name}</p>
                </div>
              </Col>
              <Col xs="4">
                <DatePrettier date={event.dates.start} />
              </Col>
              <Col xs="2">
                <PricePrettier event={event} />
              </Col>

            </Row>
          </Col>
          <Col className="zigzag">
            <div className="verticalEventGenre">{event.classifications[0].segment.name}</div>
          </Col>
        </Row>
      </Col>
    </Row>
  ))
}

const Image = props => {
  const { eventImages, alt } = props
  if (eventImages.length > 0) {
    const myImage = eventImages.filter(image => {
      return image.width == '305' && image.ratio == '4_3'
    })
    return (
      <div style={{ height: '100px' }}>
        <img src={myImage[0].url} alt={alt} />
      </div>
    )
  }
}

const DatePrettier = props => {
  const { date } = props
  const editedDate = dateFormat(new Date(date.dateTime), 'EEE do MMM yyyy')
  const editedStart = dateFormat(new Date(date.dateTime), 'H:mm')
  return (
    <div>
      <div className="timeStart">{editedStart}</div>
      <div className="dateStart">{editedDate}</div>
    </div>
  )
}

const PricePrettier = props => {
  const { event } = props
  const priceLow = event.priceRanges && event.priceRanges[0].min
  const priceHigh = event.priceRanges && event.priceRanges[0].max

  if (priceLow) {
    return (
      <div>
        <div>€{priceLow.toFixed(2)}</div>
        {priceHigh ? (
          <div> - €{priceHigh.toFixed(2)}</div>
        ) : []}
      </div >
    )
  }
  else {
    return <div>Check For Details</div>
  }
}

const VerticalEventGenre = props => {
  const { classifications } = props
  console.log(classifications.segment)
  return null
}



export default Index

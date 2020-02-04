import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import fetch from 'isomorphic-unfetch'
import useSWR from 'swr'
import Spinner from '../components/Spinner'
const fetcher = url => fetch(url).then(r => r.json())

const Index = props => {
  const { data } = useSWR('/api/tickets', fetcher)

  if (!data) return <Spinner />

  return (
    <Container className="defaultContainerBody">
      <Row className="eventRowHeader">
        <Col xs="6">Name</Col>
        <Col xs="2">Start Date</Col>
        <Col xs="2">Prices </Col>
        <Col xs="2"></Col>
      </Row>

      {data.map((event, index) => (
        <Row className="eventRow" key={index + event.dates.start.localDate}>
          <Col xs="12">
            <Row>
              <Col xs="6">{event.name}</Col>
              <Col xs="2">{event.dates.start.localDate}</Col>
              <Col xs="2">
                {event.priceRanges && event.priceRanges[0].min} -{' '}
                {event.priceRanges && event.priceRanges[0].max}
              </Col>
              <Col xs="2">{event.dates.end && event.dates.end.localDate}</Col>
            </Row>
          </Col>
          <Col xs="12">
            <Row>
              <Col xs="3">{event._embedded.venues[0].name}</Col>
            </Row>
          </Col>
        </Row>
      ))}
    </Container>
  )
}

export default Index

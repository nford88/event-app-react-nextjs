import EventsNav from '../components/eventsNav'
import EventsMain from './events'
import { Jumbotron, Container } from 'reactstrap'

export default function Index() {
  return (
    <div>
      <EventsNav />
      <Jumbotron className="events-home-jumbotron">
        <Container>
          <h1 className="display-3 text-center">Dublin Events Arts Guide</h1>
          <hr className="my-3" />
          <div className="text-center">
            <p>
              A one stop shop for all upcoming Dublin events. This guide mixes
              free and paid events together all in one place.
            </p>
          </div>
        </Container>
      </Jumbotron>
      <EventsMain />
    </div>
  )
}

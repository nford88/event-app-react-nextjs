import EventsNav from '../components/eventsNav'
import EventsMain from './events'
import { Jumbotron, Container } from 'reactstrap'
import Head from 'next/head';

export default function Index() {
  return (
    <div>
       <Head>
        <title>Dublin Event and Arts Guide</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7392b7" />
        <link rel="apple-touch-icon" href="/logo-96x96.png" />
        <meta name="apple-mobile-web-app-status-bar" content="#7392b7" />
      </Head>
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

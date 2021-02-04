import { cachedData }  from '../api/tickets'
import Link from 'next/link'


const Event = props => {
  const { params, cachedData } = props

  const filtered = cachedData.find(ev => {
        return ev.id == params.id; 
  });

  return (
      <div>
        <Link href='/'>
          <a>
            <h6>Back to Home</h6>
          </a>
        </Link>
        <p>Event ID: {params.id}</p>
        {/* <pre>{JSON.stringify(filtered, null, 2)}</pre> */}
        <div>{filtered.name}</div>
        <div>{filtered.dates.start.localDate}</div>
      </div>
  )
}
export default Event;

export function getServerSideProps(context) {
    return {
      props: {
          params: context.params,
          cachedData
        }

    };
}
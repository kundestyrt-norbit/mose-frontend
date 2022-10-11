import { SectionsWrapper } from '../components/layout/Section'
import PageLayoutWrapper from '../components/layout/PageLayoutWrapper'
import { TimestreamQueryClient, QueryCommand, Row } from '@aws-sdk/client-timestream-query'
import { SensorGraph } from '../components/elements/dashboard/SensorGraph'

/**
 * Page for displaying information about a sensor.
 */
declare const process: {
  env: {
    NODE_ENV: string
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
  }
}
const queryClient = new TimestreamQueryClient(
  {
    region: 'eu-west-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  })

interface Params {
  QueryString: string
  NextToken?: string
  MaxRows?: number

}

const params: Params = {
  QueryString: 'SELECT time, temperature FROM SensorData.particleTest WHERE temperature IS NOT NULL and time between ago(5d) and now() ORDER BY time DESC'
  // MaxRows: 1

}

// const c: Params = {
//   QueryString: "SELECT time, light FROM SensorData.particleTest WHERE light IS NOT NULL and time between ago(7d) and now() ORDER BY time DESC"
// }
const command = new QueryCommand(params)

async function getSensorData (nextToken: string | null, time: any, sensorData: any): Promise<any> {
  if (nextToken !== null) {
    params.NextToken = nextToken
  }

  try {
    const data = await queryClient.send(command)
    if (data !== undefined) {
      data.Rows?.forEach((row: Row) => {
        if (row.Data?.length === 2) {
          time.push(row.Data[0].ScalarValue)
          sensorData.push(Number(row.Data[1].ScalarValue))
        }
      })

      if (data.NextToken !== undefined) {
        return await getSensorData(data.NextToken, time, sensorData)
      }
    }
  } catch (error) {
    console.log('Error while listing databases', error)
  }
  return { time, measurments: sensorData }
}
const SensorsPage = ({ data }: any): JSX.Element => {
  return (
    <PageLayoutWrapper>
      <SectionsWrapper>
        <SensorGraph measurments={data.measurments} time={data.time}/>
      </SectionsWrapper>
    </PageLayoutWrapper>
  )
}
export async function getServerSideProps (): Promise<{
  props: { data: string[] }
}> {
  // Fetch data from external API
  const data = await getSensorData(null, [], [])
  console.log(data)
  // Pass data to the page via props
  return { props: { data } }
}
export default SensorsPage

// bin avarage,

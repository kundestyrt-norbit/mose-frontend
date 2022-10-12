import { QueryCommand, QueryCommandOutput, TimestreamQueryClient } from '@aws-sdk/client-timestream-query'

// Env var definition for aws credentials
declare const process: {
  env: {
    AWS_ACCESS_KEY_ID: string
    AWS_SECRET_ACCESS_KEY: string
  }
}

export const queryClient = new TimestreamQueryClient(
  {
    region: 'eu-west-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  })

async function queryDatabase<T> (query: string, queryDataProcessor: (data: QueryCommandOutput) => T): Promise<T> {
  const command = new QueryCommand({ QueryString: query })
  return await queryClient.send(command).then(data => queryDataProcessor(data))
}

interface Sensor {
  id: string
  column: string
}

/**
 * Fetches a list of the current sensors in the database with records in the last hour.
 */
export async function getSensors (): Promise<Sensor[]> {
  const idQuery = 'SELECT DISTINCT tagId FROM "SensorData"."particleTest" WHERE time > ago(1h) ORDER BY 1'
  const ids = await queryDatabase(idQuery, (data) => data.Rows?.map((row) => row.Data?.[0].ScalarValue) as string[])
  const dataByIdQuery = (id: string): string => `SELECT * FROM "SensorData"."particleTest" WHERE tagId='${id}' and time between ago(1h) and now() ORDER BY time DESC LIMIT 10`
  const sensors = await Promise.all(ids.map(async (id) => await queryDatabase(dataByIdQuery(id), (data) => {
    const columns = data.ColumnInfo?.filter((column, index) => data.Rows?.[0].Data?.[index].ScalarValue).slice(4)
    const columnNames = columns?.map(sensor => sensor.Name)
    const measurementNames = columnNames as string[]
    return measurementNames.map((measurementName) => {
      const sensor: Sensor = { id, column: measurementName }
      return sensor
    })
  }
  )))
  return sensors.flat()
}

interface SensorMeasurements{
  id: string
  gatewayId?: string
  name: string
  times: string[]
  measurements: string[]
}

/**
 * Get all data from the sensor since som number of days.
 * @param id sensor id
 * @param column the database column to fetch
 * @param daysAgo number of days ago from now to retrieve data from
 */
export async function getSensorData (id: string, column: string, daysAgo: number): Promise<SensorMeasurements> {
  const query = `SELECT tagId, gateway_id, time, ${column} FROM SensorData.particleTest WHERE tagId = '${id}' and time between ago(${daysAgo}d) and now() ORDER BY time DESC`
  const sensorData: SensorMeasurements = {
    id,
    name: column,
    gatewayId: undefined,
    times: [] as string[],
    measurements: [] as string[]
  }
  await queryDatabase(query, data => {
    const firstRowGatewayId = data.Rows?.[0]?.Data?.[1].ScalarValue
    sensorData.gatewayId = firstRowGatewayId
    data.Rows?.forEach(row => {
      row.Data?.[2].ScalarValue !== undefined && sensorData.times.push(row.Data?.[2].ScalarValue)
      row.Data?.[3].ScalarValue !== undefined && sensorData.measurements.push(row.Data?.[3].ScalarValue)
    })
  })
  return sensorData
}

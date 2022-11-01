import { QueryCommand, QueryCommandOutput, TimestreamQueryClient } from '@aws-sdk/client-timestream-query'
import { SensorMetaData, SensorMetaDataMap } from './_sensorMetaData'

/**
 * Page for displaying information about a sensor.
 */
declare const process: {
  env: {
    ACCESS_KEY_ID_AWS: string
    SECRET_ACCESS_KEY_AWS: string
  }
}
export const queryClient = new TimestreamQueryClient(
  {
    region: 'eu-west-1',
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID_AWS,
      secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS
    }
  })

async function queryDatabase<T> (query: string, queryDataProcessor: (data: QueryCommandOutput) => T): Promise<T> {
  const command = new QueryCommand({ QueryString: query })
  return await queryClient.send(command).then(data => queryDataProcessor(data))
}

export interface Sensor {
  id: number
  column: string
  metaData: SensorMetaData | undefined
  gatewayId: number
}

export async function getSensors (): Promise<Sensor[]> {
  const idQuery = 'SELECT DISTINCT tagId FROM "SensorData"."particleTest" WHERE time > ago(1h) ORDER BY 1'
  const ids = await queryDatabase(idQuery, (data) => data.Rows?.map((row) => row.Data?.[0].ScalarValue) as string[])
  const dataByIdQuery = (id: string): string => `SELECT * FROM "SensorData"."particleTest" WHERE tagId='${id}' and time between ago(1h) and now() ORDER BY time DESC LIMIT 10`
  const sensors = await Promise.all(ids.map(async (id) => await queryDatabase(dataByIdQuery(id), (data) => {
    const columns = data.ColumnInfo?.filter((column, index) => data.Rows?.[0].Data?.[index].ScalarValue).slice(4)
    const columnNames = columns?.map(sensor => sensor.Name)
    const measurementNames = columnNames as string[]
    return measurementNames.map((measurementName) => {
      const sensor: Sensor = { id: Number(id), column: measurementName, gatewayId: 8, metaData: SensorMetaDataMap[measurementName] }
      return sensor
    })
  }
  )))
  return sensors.flat()
}

export interface SensorMeasurements{
  id: string
  gatewayId?: string
  name: string
  times: string[]
  measurements: number[]
}

export async function getSensorData (id: string, column: string, daysAgo: number): Promise<SensorMeasurements> {
  const query = `SELECT tagId, gateway_id, BIN(time, 30m) as bin_time, ROUND(AVG(${column}), 2) FROM SensorData.particleTest WHERE tagId = '${id}' and time between ago(${daysAgo}d) and now() GROUP BY tagId, gateway_id, BIN(time, 30m) ORDER BY BIN(time, 30m) DESC`
  const sensorData: SensorMeasurements = {
    id,
    name: column,
    gatewayId: undefined,
    times: [] as string[],
    measurements: [] as number[]
  }
  await queryDatabase(query, data => {
    const firstRowGatewayId = data.Rows?.[0]?.Data?.[1].ScalarValue
    sensorData.gatewayId = firstRowGatewayId
    data.Rows?.forEach(row => {
      row.Data?.[2].ScalarValue !== undefined && sensorData.times.push(row.Data?.[2].ScalarValue)
      row.Data?.[3].ScalarValue !== undefined && sensorData.measurements.push(+row.Data?.[3].ScalarValue)
    })
  })
  return sensorData
}

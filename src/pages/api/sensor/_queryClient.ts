import { QueryCommand, QueryCommandOutput, TimestreamQueryClient } from '@aws-sdk/client-timestream-query'
import { NextApiRequest } from 'next'
import { Dashboard, Sensor, SensorIncludeDashboard } from '../../../components/elements/dashboard/types'
import { getDashboard } from '../dashboard/_queryUserSettings'
import { ExistingSensors } from './_existingSensors'
import { SensorMetaDataMap } from './_sensorMetaData'

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

export async function getSensors (): Promise<Sensor[]> {
  // const idQuery = 'SELECT DISTINCT tagId FROM "SensorData"."particleTest" WHERE time > ago(1h) ORDER BY 1'
  // const ids = await queryDatabase(idQuery, (data) => data.Rows?.map((row) => row.Data?.[0].ScalarValue) as string[])
  // const dataByIdQuery = (id: string): string => `SELECT * FROM "SensorData"."particleTest" WHERE tagId='${id}' and time between ago(1h) and now() ORDER BY time DESC LIMIT 10`
  return ExistingSensors
}

export async function getSensorsIncludeDashboard (req: NextApiRequest, userId: string): Promise<SensorIncludeDashboard[]> {
  const sensors = await getSensors()
  const dashboard: Dashboard | undefined = (await getDashboard(req, userId)).Item as Dashboard | undefined
  if (dashboard !== undefined) {
    sensors.forEach((sensor: SensorIncludeDashboard) => {
      sensor.sensorIncludedInDashboard = dashboard.sensors.some(s => s.id === sensor.id && s.column === sensor.column && s.gatewayId === sensor.gatewayId)
      sensor.metaData = SensorMetaDataMap[sensor.column]
    })
  }
  return sensors
}

export interface SensorMeasurements extends Sensor{
  times: string[]
  measurements: number[]
}

export async function getSensorData (id: number, column: string, daysAgo: number): Promise<SensorMeasurements> {
  const query = `SELECT tagId, gateway_id, BIN(time, 30m) as bin_time, ROUND(AVG(${column}), 2) FROM SensorData.particleTest WHERE tagId = '${id}' and time between ago(${daysAgo}d) and now() GROUP BY tagId, gateway_id, BIN(time, 30m) ORDER BY BIN(time, 30m) DESC`
  return await queryDatabase(query, data => {
    const firstRowGatewayId = data.Rows?.[0]?.Data?.[1].ScalarValue
    const sensorData: SensorMeasurements = {
      id,
      column,
      times: [] as string[],
      measurements: [] as number[],
      gatewayId: Number(firstRowGatewayId),
      metaData: SensorMetaDataMap[column]
    }
    data.Rows?.forEach(row => {
      row.Data?.[2].ScalarValue !== undefined && sensorData.times.push(row.Data?.[2].ScalarValue)
      row.Data?.[3].ScalarValue !== undefined && sensorData.measurements.push(+row.Data?.[3].ScalarValue)
    })
    return sensorData
  })
}

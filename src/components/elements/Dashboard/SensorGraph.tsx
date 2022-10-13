import useSWR from 'swr'
import { SensorMeasurements } from '../../../pages/api/sensor/_queryClient'
import { Graph } from './Graph'
interface SensorGraphProps {
  id: string
  sensor: string
}

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<SensorMeasurements> => await fetch(input, init).then(async (res) => await (res.json() as Promise<SensorMeasurements>))

export function SensorGraph ({ id, sensor }: SensorGraphProps): JSX.Element {
  const { data, error } = useSWR(`/api/sensor/${id}/${sensor}`, fetcher)

  const graphTitle = sensor.charAt(0).toUpperCase() + sensor.slice(1)
  return (data != null) ? <Graph title={graphTitle} label="" time={data.times} measurments={data.measurements}/> : <></>
}

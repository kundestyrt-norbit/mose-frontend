import { CircularProgress } from '@mui/material'
import useSWR from 'swr'
import { SensorMeasurements } from '../../../pages/api/sensor/_queryClient'
import { SensorProps } from '../../../pages/list'
import { Graph } from './Graph'

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<SensorMeasurements> => await fetch(input, init).then(async (res) => await (res.json() as Promise<SensorMeasurements>))

export function SensorGraph ({ id, column }: SensorProps): JSX.Element {
  const { data } = useSWR(`/api/sensor/${id}/${column}`, fetcher)

  const graphTitle = column.charAt(0).toUpperCase() + column.slice(1)
  return (data != null) ? <Graph title={graphTitle} label="" time={data.times} measurments={data.measurements}/> : <CircularProgress size={100} sx={{ margin: 'auto' }}/>
}

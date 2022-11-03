import { Box, CircularProgress } from '@mui/material'
import { SxProps, Theme } from '@mui/system'
import useSWR from 'swr'
import { SensorMeasurements } from '../../../pages/api/sensor/_queryClient'
import { Graph } from './Graph'
interface SensorGraphProps {
  id: number
  column: string
  friendlyName?: string
  sx?: SxProps<Theme>
  unit?: string
}

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<SensorMeasurements> => await fetch(input, init).then(async (res) => await (res.json() as Promise<SensorMeasurements>))

export function SensorGraph ({ id, column, sx, friendlyName, unit }: SensorGraphProps): JSX.Element {
  const { data } = useSWR(`/api/sensor/${id}/${column}`, fetcher)
  return (
    <Box sx={sx}>
      {(data != null) ? <Graph time={data.times} measurments={data.measurements} unit={unit} /> : <CircularProgress size={100} />}
    </Box>
  )
}

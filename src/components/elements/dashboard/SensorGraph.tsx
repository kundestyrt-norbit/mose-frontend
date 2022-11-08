import { Box, CircularProgress } from '@mui/material'
import { SxProps, Theme } from '@mui/system'
import useSWR from 'swr'
import { SensorMeasurements } from '../../../pages/api/sensor/_queryClient'
import { Graph } from './Graph'
import { SensorPredictions } from './types'

interface SensorGraphProps {
  id: number
  column: string
  friendlyName?: string
  sx?: SxProps<Theme>
  unit?: string
  includePrediction: boolean
}

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<SensorMeasurements> => await fetch(input, init).then(async (res) => await (res.json() as Promise<SensorMeasurements>))
const fetcherPrediction = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<SensorPredictions> => await fetch(input, init).then(async (res) => await (res.json() as Promise<SensorPredictions>))

export function SensorGraph ({ id, column, sx, friendlyName, unit, includePrediction }: SensorGraphProps): JSX.Element {
  const { data } = useSWR(`/api/sensor/${id}/${column}`, fetcher)
  const { data: dataPrediction } = includePrediction ? useSWR(`/api/sensor/8/${column}/prediction`, fetcherPrediction) : { data: undefined }
  return (
    <Box sx={sx}>
      {(data != null) ? <Graph time={data.times} measurments={data.measurements} unit={unit} dataPrediction={dataPrediction}/> : <CircularProgress size={100} />}
    </Box>
  )
}

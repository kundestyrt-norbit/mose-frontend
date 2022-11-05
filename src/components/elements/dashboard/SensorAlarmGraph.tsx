import { Box, CircularProgress } from '@mui/material'
import { SxProps, Theme } from '@mui/system'
import useSWR from 'swr'
import { SensorMeasurements } from '../../../pages/api/sensor/_queryClient'
import { AlarmGraph } from './AlarmGraph'
import { Alarm, ALARM_TYPE, SensorPredictions } from './types'
interface SensorAlarmGraphProps {
  id: number
  column: string
  friendlyName?: string
  sx?: SxProps<Theme>
  unit?: string
  alarms?: {[key in ALARM_TYPE]: Alarm}
  includePrediction: boolean
}

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<SensorMeasurements> => await fetch(input, init).then(async (res) => await (res.json() as Promise<SensorMeasurements>))
const fetcherPrediction = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<SensorPredictions> => await fetch(input, init).then(async (res) => await (res.json() as Promise<SensorPredictions>))

export function SensorAlarmGraph ({ id, column, sx, friendlyName, unit, alarms, includePrediction }: SensorAlarmGraphProps): JSX.Element {
  const { data } = useSWR(`/api/sensor/${id}/${column}`, fetcher)
  const { data: predictionData } = includePrediction ? useSWR(`/api/sensor/8/${column}/prediction`, fetcherPrediction) : { data: undefined }
  return (
    <Box sx={sx}>
      {(data != null) ? <AlarmGraph time={data.times} measurments={data.measurements} unit={unit} alarms={alarms} predictionData={predictionData}/> : <CircularProgress size={100} />}
    </Box>
  )
}

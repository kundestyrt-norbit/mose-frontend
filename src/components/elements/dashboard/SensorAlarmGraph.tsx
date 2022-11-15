import { Box, CircularProgress } from '@mui/material'
import { SxProps, Theme } from '@mui/system'
import { SensorMeasurements } from '../../../pages/api/sensor/_queryClient'
import AlarmGraph from './AlarmGraph'
import { Alarm, ALARM_TYPE, SensorPredictions } from './types'
interface SensorAlarmGraphProps {
  data?: SensorMeasurements
  sx?: SxProps<Theme>
  unit?: string
  alarms?: {[key in ALARM_TYPE]: Alarm}
  predictions?: SensorPredictions
}

export function SensorAlarmGraph ({ data, sx, unit, alarms, predictions }: SensorAlarmGraphProps): JSX.Element {
  return (
    <Box sx={sx}>
      {(data != null) ? <AlarmGraph time={data.times} measurments={data.measurements} unit={unit} alarms={alarms} dataPrediction={predictions}/> : <CircularProgress size={100} />}
    </Box>
  )
}

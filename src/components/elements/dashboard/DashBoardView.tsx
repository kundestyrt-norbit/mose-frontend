import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Switch, TextField } from '@mui/material'
import React, { useState } from 'react'
import { SensorAlarmGraph } from './SensorAlarmGraph'
import { Alarm, ALARM_TYPE, Dashboard, Sensor, SensorPredictions } from './types'
import { Controller, useForm } from 'react-hook-form'
import { SensorMetaDataMap } from '../../../pages/api/sensor/_sensorMetaData'
import useSWR from 'swr'
import { SensorMeasurements } from '../../../pages/api/sensor/_queryClient'

const AlarmFormDialog = ({ sensor, dashboardId, onAddAlarm, isOpen, onCloseDialog }: {sensor: Sensor, isOpen: boolean, dashboardId: string, onAddAlarm: () => void, onCloseDialog: () => void}): JSX.Element => {
  const handleClose = (): void => {
    onCloseDialog()
  }

  const addAlarm = (alarm: Alarm): void => {
    const endpoint = `/api/dashboard/${dashboardId}/${sensor.gatewayId}/${sensor.id}/${sensor.column}/alarm`
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(alarm)
    }).then(() => onAddAlarm()).then(() => handleClose()).catch(e => console.log(e))
  }

  const deleteAlarm = (alarm: Alarm): void => {
    const endpoint = `/api/dashboard/${dashboardId}/${sensor.gatewayId}/${sensor.id}/${sensor.column}/alarm`
    fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(alarm)
    }).then(() => onAddAlarm()).then(() => handleClose()).catch(e => console.log(e))
  }

  const defaultAlarm = sensor.alarms?.[ALARM_TYPE.LOWER] ?? sensor.alarms?.[ALARM_TYPE.UPPER]

  const { control, handleSubmit, watch, reset } = useForm<Alarm>({
    defaultValues: {
      ...(defaultAlarm ?? {
        name: '',
        value: 0,
        type: ALARM_TYPE.LOWER
      })
    }
  })

  const currentAlarm = sensor.alarms?.[watch('type')]

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Alarm</DialogTitle>
        <form onSubmit={(e) => { handleSubmit(addAlarm)(e).catch(e => console.log(e)) }}>
          <DialogContent sx={(theme) => (
            {
              backgroundColor: theme.palette.background.default
            })
          }>
            <DialogContentText>
              Choose an alarm to attach to the dashboard sensor
            </DialogContentText>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Controller control={control}
                name={'type'} render={({ field: { onChange, value } }) => {
                  return (<TextField value={value} label={'Type'} onChange={(event) => {
                    reset(sensor.alarms?.[event.target.value as ALARM_TYPE] ?? { name: '', value: 0, type: event.target.value as ALARM_TYPE })
                    onChange(event)
                  }} required select id='select' sx={{ marginTop: '20px' }}>
                    {Object.values(ALARM_TYPE).map((type, i) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                  </TextField>)
                }} />
              <Controller control={control}
                name={'name'} render={({ field: { onChange, value } }) => {
                  return <TextField onChange={onChange} value={value} required id="name" aria-describedby="my-helper-text" sx={{ marginTop: '20px' }} label="Name" />
                }} />
              <Controller control={control}
                name={'value'}
                render={({ field: { onChange, value } }) => {
                  return <TextField
                    value={value ?? ''}
                    onChange={(event) => onChange((event.target.value.length > 0) ? +event.target.value : '')}
                    sx={{ marginTop: '20px' }}
                    id="value"
                    aria-describedby="my-helper-text"
                    type="number"
                    label="Value"
                    required />
                }} />

            </Box>
          </DialogContent>
          <DialogActions sx={theme => ({ backgroundColor: theme.palette.background.default })}>
            <Button type='button' onClick={() => handleClose()}>Cancel</Button>
            <Button type='submit'>{sensor.alarms?.[watch('type')] != null ? 'Change' : 'Add'}</Button>
            {currentAlarm != null && <Button type='button' onClick={() => deleteAlarm(currentAlarm)}>Delete</Button>}
          </DialogActions>

        </form>
      </Dialog>
    </div>
  )
}
export const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<SensorMeasurements> => await fetch(input, init).then(async (res) => await (res.json() as Promise<SensorMeasurements>))
export const fetcherPrediction = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<SensorPredictions> => await fetch(input, init).then(async (res) => await (res.json() as Promise<SensorPredictions>))

const DashboardSensorView = ({ dashboardId, sensor, onAddAlarm, unit }: {sensor: Sensor, dashboardId: string, unit: string, onAddAlarm: () => void}): JSX.Element => {
  const [openDialog, setOpenDialog] = useState(false)
  const [includePrediction, setIncludePrediction] = useState(true)
  const { column, id, alarms } = sensor
  const { data } = useSWR(`/api/sensor/${id}/${column}`, fetcher)
  const { data: dataPrediction, error } = useSWR(includePrediction ? `/api/sensor/8/${column}/prediction` : null, fetcherPrediction, { shouldRetryOnError: false })
  return (
    <>
      {(data?.times?.length !== 0)
        ? <Box>
       <Box>
       {error === undefined
         ? <>
        Show predictions
        <Switch checked={includePrediction} onChange={(e) => setIncludePrediction(e.target.checked)} /></>
         : <>Predictions not available</> }
      </Box>
      <SensorAlarmGraph data={data} alarms={alarms} unit={unit} predictions={dataPrediction}/>
      {openDialog && <AlarmFormDialog sensor={sensor} dashboardId={dashboardId} onAddAlarm={onAddAlarm} onCloseDialog={() => setOpenDialog(false)} isOpen={openDialog}/>}
      <Button sx={{ marginBottom: '20px' }} variant="outlined" onClick={() => setOpenDialog(true)}>
        Configure alarm
      </Button>
      </Box>
        : <>No data to display</>}
    </>

  )
}

const DashBoardView = ({ dashboardName, dashboardId, sensors, onAddAlarm }: Dashboard & {onAddAlarm: () => void}): JSX.Element => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '100%',
      alignItems: 'center',
      margin: '1% 1%',
      padding: '0',
      justifyContent: 'space-evenly'
    }}>
      <h1 style={{ width: '100%', textAlign: 'center', margin: '1% 3%' }}>{dashboardName}</h1>
      {sensors?.map((sensor: Sensor) => {
        return (
          <div key={sensor.id.toString() + sensor.column} style={{ flexDirection: 'column', textAlign: 'center', width: '45%', minWidth: '320px', border: '1px solid rgba(0, 0, 0, 0.229)', borderRadius: '4px', margin: '1% 0' }}>
            <h2 style={{ height: '3rem' }}>{SensorMetaDataMap[sensor.column].friendlyName ?? sensor.column}</h2>
            <DashboardSensorView onAddAlarm={onAddAlarm} dashboardId={dashboardId} sensor={sensor} unit={SensorMetaDataMap[sensor.column].unit} />
          </div>
        )
      })}
    </div>

  )
}

export default DashBoardView

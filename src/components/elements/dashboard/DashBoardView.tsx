import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { SensorAlarmGraph } from './SensorAlarmGraph'
import { Alarm, ALARM_TYPE, Dashboard, Sensor } from './types'
import { Controller, useForm } from 'react-hook-form'
import { SensorMetaDataMap } from '../../../pages/api/sensor/_sensorMetaData'

const AlarmFormDialog = ({ sensor, dashboardId, onAddAlarm }: {sensor: Sensor, dashboardId: string, onAddAlarm: (alarm: Alarm) => void}): JSX.Element => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }
  console.log(sensor)

  const addAlarm = (alarm: Alarm): void => {
    const endpoint = `/api/dashboard/${dashboardId}/${sensor.gatewayId}/${sensor.id}/${sensor.column}/alarm`
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(alarm)
    }).then(() => onAddAlarm(alarm)).then(() => handleClose()).catch(e => console.log(e))
  }

  const { control, handleSubmit, getValues } = useForm<Alarm>({
    defaultValues: {
      name: '',
      value: undefined,
      type: ALARM_TYPE.LOWER
    }
  })

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add alarm
      </Button>
      <Dialog open={open} onClose={handleClose}>
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
                name={'name'} render={({ field: { onChange, value } }) => {
                  return <TextField onChange={onChange} value={value} required id="name" aria-describedby="my-helper-text" label="Name" />
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
              <Controller control={control}
                name={'type'} render={({ field: { onChange, value } }) => {
                  return (<TextField value={value} onChange={onChange} required select id='select' sx={{ marginTop: '20px' }}>
                    {Object.values(ALARM_TYPE).map((type, i) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                  </TextField>)
                }} />

            </Box>
          </DialogContent>
          <DialogActions sx={theme => ({ backgroundColor: theme.palette.background.default })}>
            <Button type='button' onClick={() => handleClose()}>Cancel</Button><Button type='submit'>{sensor.alarms?.[getValues().type] != null ? 'Change' : 'Add'}</Button>
          </DialogActions>

        </form>
      </Dialog>
    </div>
  )
}

const DashboardSensorView = ({ dashboardId, sensor, onAddAlarm, unit }: {sensor: Sensor, dashboardId: string, unit: string, onAddAlarm: (alarm: Alarm) => void}): JSX.Element => {
  const { column, id, alarms } = sensor
  return (
    <Box>
      <SensorAlarmGraph column={column} id={id} alarms={sensor.alarms} unit={unit} />
      {alarms != null && Object.values(alarms).map((alarm) => <>{alarm.name}</>)}
      <AlarmFormDialog sensor={sensor} dashboardId={dashboardId} onAddAlarm={onAddAlarm} />
    </Box>
  )
}

const DashBoardView = ({ dashboardName, dashboardId, sensors, onAddAlarm }: Dashboard & {onAddAlarm: (alarm: Alarm) => void}): JSX.Element => {
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
          <div key={sensor.id.toString() + sensor.column} style={{ flexDirection: 'column', textAlign: 'center', width: '45%', minWidth: '400px', border: '1px solid rgba(0, 0, 0, 0.229)', borderRadius: '4px', margin: '1% 0' }}>
            <h2 style={{ height: '3rem' }}>{SensorMetaDataMap[sensor.column].friendlyName ?? sensor.column}</h2>
            <DashboardSensorView onAddAlarm={onAddAlarm} dashboardId={dashboardId} sensor={sensor} unit={SensorMetaDataMap[sensor.column].unit} />
          </div>
        )
      })}
    </div>

  )
}

export default DashBoardView

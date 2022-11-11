import { Box, Button, Dialog, DialogContent, styled } from '@mui/material'
import React, { useState } from 'react'

import AddToDash from '../AddToDash'
import { BootstrapDialogTitle } from './BootstrapDialogTitle'
import { Sensor } from '../dashboard/types'
import { SensorAlarmGraph } from '../dashboard/SensorAlarmGraph'
import useSWR from 'swr'
import { fetcher, fetcherPrediction } from '../dashboard/DashBoardView'

const SensorDialogContent = styled(DialogContent)({
  margin: 'auto',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  '& .MuiDialogContent-root': {
    height: 'initial'
  },
  overflowY: 'initial'
})

const SensorDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    maxHeight: '90vh',
    width: '100vw',
    height: '100vh',
    maxWidth: '90vw'
  }
}))

const SensorModalButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.background.default};
`
export const SensorModal = ({ id, column, metaData }: Sensor): JSX.Element => {
  const [open, setOpen] = useState(false)
  const { data } = useSWR(`/api/sensor/${id}/${column}`, fetcher)
  const { data: dataPrediction } = useSWR(`/api/sensor/8/${column}/prediction`, fetcherPrediction, { shouldRetryOnError: false })
  return (
      <Box sx={{ flexDirection: 'column', display: 'flex', minWidth: '300px', maxWidth: '48%', width: '100%', margin: '1% 0', borderRadius: '3px', border: '1px solid rgb(0,0,0,0.229)' }}>
        <SensorModalButton onClick={() => { setOpen(!open) }}
          sx={{ backgroundColor: 'primary', borderRadius: '5px' }}>
          <span style={{ textAlign: 'center' }}>{metaData?.friendlyName ?? column}</span>
        </SensorModalButton>
        <SensorDialog open={open} onClose={() => setOpen(false)} >
          <BootstrapDialogTitle sx={{ color: (theme) => theme.palette.primary.light }} id="customized-dialog-title" onClose={() => setOpen(false)}>
            {metaData?.friendlyName}
          </BootstrapDialogTitle>
          <SensorDialogContent>
            <SensorAlarmGraph data={data} unit={metaData?.unit} predictions={dataPrediction} sx={{ width: '80vw', height: 'calc(90vh - 5rem - 140px - 6%)', display: 'flex', justifyContent: 'center', marginTop: '20px' }}/>
            {metaData?.description}
            <AddToDash id={id} column={column} gatewayId={8} />
          </SensorDialogContent>
        </SensorDialog>
      </Box>
  )
}

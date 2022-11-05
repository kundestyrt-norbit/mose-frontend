import { Box, Button, Dialog, DialogContent, DialogTitle, DialogTitleProps, IconButton, styled } from '@mui/material'
import type { NextPage } from 'next'
import React, { useState } from 'react'
import useSWR from 'swr'
import { SensorGraph } from '../../components/elements/dashboard/SensorGraph'
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'
import { Sensor } from '../../components/elements/dashboard/types'
import CloseIcon from '@mui/icons-material/Close'
import AddToDash from '../../components/elements/AddToDash'

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Sensor[]> => await fetch(input, init).then(async (res) => await (res.json() as Promise<Sensor[]>))
export interface SensorProps {
  id: number
  column: string
}

const SensorDialogContent = styled(DialogContent)({
  margin: 'auto',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%'
})

const SensorDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '100%',
    maxWidth: '100%'
  }
}))
const PageWrapper = styled(Box)`
  width: 100%;
  margin: auto;
  text-align: center; 
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
`

const SensorModalButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.background.default};
`
const BootstrapDialogTitle = (props: DialogTitleProps & { onClose: () => void }): JSX.Element => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose !== null
        ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.primary.light
            }}
          >
            <CloseIcon />
          </IconButton>
          )
        : null}
    </DialogTitle>
  )
}

const SensorModal = ({ id, column, metaData }: Sensor): JSX.Element => {
  const [open, setOpen] = useState(false)

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
          <SensorGraph id={id} column={column} sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }} unit={metaData?.unit} />
          {metaData?.description}
          <AddToDash id={id} column={column} gatewayId={8} />
        </SensorDialogContent>
      </SensorDialog>
    </Box>
  )
}

const ListPage: NextPage = () => {
  const { data } = useSWR('/api/sensor/all', fetcher)

  return (
    <PageLayoutWrapper>
      <PageWrapper>
        <h1>Norbit Parking Lot</h1>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          {/* <RowAndColumnSpacing></RowAndColumnSpacing> */}
          {data?.map((sensor) => <SensorModal key={sensor.id.toString() + sensor.column} id={sensor.id} column={sensor.column} metaData={sensor.metaData} gatewayId={8} />
          )}
        </Box>
      </PageWrapper>
    </PageLayoutWrapper>
  )
}

export default ListPage

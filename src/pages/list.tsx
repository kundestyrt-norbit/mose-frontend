import { Box, Button, Dialog, DialogContent, DialogTitle, DialogTitleProps, IconButton, styled } from '@mui/material'
import type { NextPage } from 'next'
import { useState } from 'react'
import useSWR from 'swr'
import { SensorGraph } from '../components/elements/dashboard/SensorGraph'
import PageLayoutWrapper from '../components/layout/PageLayoutWrapper'
import { Sensor } from './api/sensor/_queryClient'
import CloseIcon from '@mui/icons-material/Close'

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Sensor[]> => await fetch(input, init).then(async (res) => await (res.json() as Promise<Sensor[]>))

const SensorDialogContent = styled(DialogContent)({
  margin: 'auto',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  minHeight: '500px',
  width: '100%'
})

const SensorDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '100%',
    maxWidth: '500px' // Set your width here
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))
const PageWrapper = styled(Box)`
  width: 80%;
  margin: auto;
`

const SensorModalButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.background.default};
`
const BootstrapDialogTitle = (props: DialogTitleProps & {onClose: () => void}): JSX.Element => {
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
            color: (theme) => theme.palette.grey[500]
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
    <Box sx={{ flexDirection: 'column', display: 'flex', minWidth: '300px', maxWidth: '50%', width: '100%', margin: 'auto' }}>
      <SensorModalButton onClick={() => { setOpen(!open) }}
        sx={{ backgroundColor: 'primary', borderRadius: '5px' }}>
        <span style={{ textAlign: 'center' }}>{metaData?.friendlyName ?? column}</span>
      </SensorModalButton>
      <SensorDialog open={open} onClose={() => setOpen(false)} >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
            {metaData?.friendlyName}
          </BootstrapDialogTitle>
          <SensorDialogContent>
            <SensorGraph id={id} sensor={column} />
            {metaData?.description}
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
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '30px' }}>
          {/* <RowAndColumnSpacing></RowAndColumnSpacing> */}
          {data?.map((sensor) => <SensorModal key={sensor.id + sensor.column} id={sensor.id} column={sensor.column} metaData={sensor.metaData} />
          )}
        </Box>
      </PageWrapper>
    </PageLayoutWrapper>
  )
}

export default ListPage

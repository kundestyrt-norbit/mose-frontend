import { Box, List, ListItem, ListItemButton, styled } from '@mui/material'
import type { NextPage } from 'next'
import { useState } from 'react'
import useSWR from 'swr'
import { SensorGraph } from '../components/elements/dashboard/SensorGraph'
import PageLayoutWrapper from '../components/layout/PageLayoutWrapper'
import { Sensor } from './api/sensor/_queryClient'
import AddToDash from '../components/elements/AddToDash'

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Sensor[]> => await fetch(input, init).then(async (res) => await (res.json() as Promise<Sensor[]>))

export interface SensorProps {
  id: number
  column: string
}
const SensorWrapper = styled(Box)`
  width: 50%;
  border-radius: 5px;
  display: flex;
`
const PageWrapper = styled(Box)`
  width: 100%;
  margin: auto;
`

const CollapsibleSensor = ({ id, column }: SensorProps): JSX.Element => {
  const [open, setOpen] = useState(false)
  console.log(id, column)

  return (
    <ListItem sx={{ flexDirection: 'column', display: 'flex' }}>
      <ListItemButton
        onClick={() => { setOpen(!open) }}
        sx={{ width: '100%', borderRadius: '5px', border: '0.5px solid', color: '#7895a7' }}
      >
        <span style={{ textAlign: 'center', width: '100%' }}>
          {column}
        </span>
      </ListItemButton>
      {open && <SensorWrapper >
        <SensorGraph id={id} column={column} />
        <AddToDash id={id} column={column} gatewayId={8} />
      </SensorWrapper>}
    </ListItem>
  )
}

/**
 * Does nothing. Just redirection to /sensors
 * Natural page to have in the future
 */
const ListPage: NextPage = () => {
  const { data } = useSWR('/api/sensor/all', fetcher)

  return (
    <PageLayoutWrapper>
      <PageWrapper>
        <List>
          {/* <RowAndColumnSpacing></RowAndColumnSpacing> */}
          {data?.map((sensor) => <CollapsibleSensor key={sensor.id.toString() + sensor.column} id={sensor.id} column={sensor.column} />
          )}
        </List>
      </PageWrapper>
    </PageLayoutWrapper>
  )
}

export default ListPage

import { Box, List, ListItem, ListItemButton, styled } from '@mui/material'
import type { NextPage } from 'next'
import { useState } from 'react'
import useSWR from 'swr'
import { SensorGraph } from '../components/elements/Dashboard/SensorGraph'
import PageLayoutWrapper from '../components/layout/PageLayoutWrapper'
import { Sensor } from './api/sensor/_queryClient'

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Sensor[]> => await fetch(input, init).then(async (res) => await (res.json() as Promise<Sensor[]>))

interface SensorModalProps {
  id: string
  name: string
}
const SensorWrapper = styled(Box)`
  width: 50%;
  text-align: center;
  margin: auto;
  background-color: white;
  border-radius: 5px;
`

const CollapsibleSensor = ({ id, name }: SensorModalProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <ListItem sx={{ flexDirection: 'column', display: 'flex' }}>
      <ListItemButton onClick={() => { setOpen(!open) }} sx={{ width: '100%' }}><span style={{ textAlign: 'center', width: '100%' }}>{name}</span></ListItemButton>
      <SensorWrapper >
        {open && <SensorGraph id={id} sensor={name}/>}
      </SensorWrapper>
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
      <List>
      {/* <RowAndColumnSpacing></RowAndColumnSpacing> */}
      {data?.map((sensor) => <CollapsibleSensor key={sensor.id + sensor.column} id={sensor.id} name={sensor.column}/>
      )}
      </List>
    </PageLayoutWrapper>
  )
}

export default ListPage

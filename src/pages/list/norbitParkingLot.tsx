import { Box, CircularProgress, styled } from '@mui/material'
import type { NextPage } from 'next'
import React from 'react'
import useSWR from 'swr'
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'
import { Sensor } from '../../components/elements/dashboard/types'
import { SensorModal } from '../../components/elements/list/SensorModal'

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Sensor[]> => await fetch(input, init).then(async (res) => await (res.json() as Promise<Sensor[]>))
export interface SensorProps {
  id: number
  column: string
}

const PageWrapper = styled(Box)`
  width: 100%;
  margin: auto;
  text-align: center; 
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
`

const ListPage: NextPage = () => {
  const { data } = useSWR('/api/sensor/all', fetcher)

  return (
    <PageLayoutWrapper>
      <PageWrapper>
        <h1>Norbit Parking Lot</h1>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {(data != null)
          ? data?.map((sensor) => <SensorModal key={sensor.id.toString() + sensor.column} id={sensor.id} column={sensor.column} metaData={sensor.metaData} gatewayId={8} />
          )
          : <CircularProgress />}
        </Box>
      </PageWrapper>
    </PageLayoutWrapper>
  )
}

export default ListPage

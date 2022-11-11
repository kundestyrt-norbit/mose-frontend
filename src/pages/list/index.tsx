import { Box, Button, CircularProgress, styled } from '@mui/material'
import type { NextPage } from 'next'
import useSWR from 'swr'
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'
import { Sensor } from '../../components/elements/dashboard/types'
import Link from 'next/link'
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
const TitleButton = styled(Button)`
  text-transform: none;
  font-size: 2em;
  margin-top: 0.67em;
`

const ListPage: NextPage = () => {
  const { data } = useSWR('/api/sensor/all', fetcher)

  return (
    <PageLayoutWrapper>
      <PageWrapper>
        <Link href='/list/norbitParkingLot'>
          <TitleButton> Norbit Parking Lot </TitleButton>
        </Link>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          {/* <RowAndColumnSpacing></RowAndColumnSpacing> */}
        {(data != null)
          ? data?.map((sensor) => <SensorModal key={sensor.id.toString() + sensor.column} id={sensor.id} column={sensor.column} metaData={sensor.metaData} gatewayId={8} />
          )
          : <CircularProgress />}
        </Box>
        <Link href='/list/gloshaugen'>
          <TitleButton> Gløshaugen </TitleButton>
        </Link>
        <h2 style={{ marginTop: '0', color: '#faacac' }}> No sensors here yet ...</h2>
      </PageWrapper>
    </PageLayoutWrapper>
  )
}

export default ListPage

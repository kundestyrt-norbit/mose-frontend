import type { GetServerSideProps, NextPage } from 'next'
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'
import TemporaryDrawer from '../../components/elements/Dashboard/SideBar'
import FilterDash from '../../components/elements/Dashboard/FilterDash'
import { Dashboard, JSONToDashBoard } from '../../components/elements/Dashboard/types'

declare const process: {
  env: {
    BASE_URL: string
  }
}

interface DashboardProps {
  dashboard: Dashboard
}

const HomePage: NextPage<DashboardProps> = ({ dashboard: { dashboardId, dashboardName, sensors } }: DashboardProps) => {
  return (
    <PageLayoutWrapper>
      <TemporaryDrawer />
      <FilterDash />
    </PageLayoutWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params === undefined) {
    return {
      notFound: true
    }
  }
  const dashboardId = context.params.dashboardNumber as string
  const response = await fetch(process.env.BASE_URL + '/api/dashboard/' + dashboardId)
  console.log(response)
  const dashboard = JSONToDashBoard(await response.json())
  return {
    props: { dashboard }
  }
}

export default HomePage

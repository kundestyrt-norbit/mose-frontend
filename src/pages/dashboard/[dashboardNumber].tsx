import type { NextPage } from 'next'
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'
import { useRouter } from 'next/router'
import TemporaryDrawer from '../../components/elements/dashboard/SideBar'
import FilterDash from '../../components/elements/dashboard/FilterDash'

/**
 * Does nothing. Just redirection to /sensors
 * Natural page to have in the future
 */
const HomePage: NextPage = () => {
  const router = useRouter()
  const { dashboardNumber, id } = router.query
  console.log(id, dashboardNumber)
  return (
    <PageLayoutWrapper>
      <TemporaryDrawer />
      <FilterDash />
    </PageLayoutWrapper>
  )
}

export default HomePage

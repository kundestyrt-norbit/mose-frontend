import type { NextPage } from 'next'
import { SectionsWrapper } from '../../components/layout/Section'
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'
import { useRouter } from 'next/router'
import Navigator from '../../components/elements/Dashboard/Navigator'

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
      <SectionsWrapper>
        <Navigator></Navigator>
      </SectionsWrapper>
    </PageLayoutWrapper>
  )
}

export default HomePage

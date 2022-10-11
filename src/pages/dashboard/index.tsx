import type { NextPage } from 'next'
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'
import Navigator from '../../components/elements/Dashboard/Navigator'
import NorbitParking from '../../components/elements/Dashboard/NorbitParking'

/**
 * Does nothing. Just redirection to /sensors
 * Natural page to have in the future
 */
const hei: NextPage = () => {
  return (
    <div>
      <PageLayoutWrapper>
            <Navigator />
            <NorbitParking></NorbitParking>
      </PageLayoutWrapper>
    </div>
  )
}

export default hei
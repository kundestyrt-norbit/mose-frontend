import { SectionsWrapper } from '../components/elements/Section'
import SensorPageTemplate from '../components/elements/SensorPageTemplate'
import PageLayoutWrapper from '../components/layout/PageLayoutWrapper'

/**
 * Page for displaying information about a sensor.
 */
const SensorsPage = (): JSX.Element => {
  return (
    <PageLayoutWrapper>
      <SectionsWrapper>
        <SensorPageTemplate/>
      </SectionsWrapper>
    </PageLayoutWrapper>
  )
}
export default SensorsPage

import type { NextPage } from 'next'
import { SectionsWrapper } from '../components/elements/Section'
import PageLayoutWrapper from '../components/layout/PageLayoutWrapper'

/**
 * Does nothing. Just redirection to /sensors
 * Natural page to have in the future
 */
const ListPage: NextPage = () => {
  return (
    <PageLayoutWrapper>
      <SectionsWrapper>hei</SectionsWrapper>
    </PageLayoutWrapper>
  )
}

export default ListPage

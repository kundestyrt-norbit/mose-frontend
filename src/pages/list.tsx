import type { NextPage } from 'next'
import RowAndColumnSpacing from '../components/elements/List/Grid'
import PageLayoutWrapper from '../components/layout/PageLayoutWrapper'

/**
 * Does nothing. Just redirection to /sensors
 * Natural page to have in the future
 */
const ListPage: NextPage = () => {
  return (
    <PageLayoutWrapper>
      <RowAndColumnSpacing></RowAndColumnSpacing>
    </PageLayoutWrapper>
  )
}

export default ListPage

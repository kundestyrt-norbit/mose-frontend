import { Box, styled } from '@mui/material'
import type { NextPage } from 'next'
import React from 'react'

import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'

const PageWrapper = styled(Box)`
  width: 100%;
  margin: auto;
  text-align: center; 
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
`
// hardcoded page for sensors at Gløshaugen. Should be done dynamically in the future
const ListPage: NextPage = () => {
  return (
    <PageLayoutWrapper>
      <PageWrapper>
        <h1>Gløshaugen</h1>
        <h2 style={{ marginTop: '100px', color: '#faacac', height: '100%' }}> No sensors here yet ...</h2>
      </PageWrapper>
    </PageLayoutWrapper>
  )
}

export default ListPage

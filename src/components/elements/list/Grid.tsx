import * as React from 'react'
import Box from '@mui/material/Box'
import Link from 'next/link'
import { Button, Container, styled } from '@mui/material'
import CheckboxesTags from '../AddToDash'

const BootstrapButton = styled(Button)({
  fontWeight: 'bold',
  textTransform: 'none',
  fontSize: 22,
  padding: '6px 12px',
  lineHeight: 1.5,
  fontFamily: [
    'sans-serif'
  ].join(','),
  '&:hover': {
  },
  '&:active': {
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem #bbdcff7f'
  }
})

const BoxWrapper = styled(Box)`
  margin: 1%;
  width: 80%;
  height: 400px; 
  text-align: center;
  border-radius: 3%;
  `

const StyledFilter = styled(CheckboxesTags)`
  margin: '2%';
  max-width: '30%';
`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function RowAndColumnSpacing () {
  return (
    <Container sx={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', margin: '3%', maxWidth: '100%' }}>
      <Container sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
        <BoxWrapper boxShadow={2}>
          <Box>
            <BootstrapButton> Temperature </BootstrapButton>
          </Box>
        </BoxWrapper>
        <StyledFilter />
      </Container>
      <Container sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
        <BoxWrapper boxShadow={2}>
          <Box>
            <Link href='/sensor'>
              <BootstrapButton size='large'> No of Particles </BootstrapButton>
            </Link>
          </Box>
        </BoxWrapper>
        <StyledFilter />
      </Container>
      <Container sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
        <BoxWrapper boxShadow={2}>
          <Box>
            <BootstrapButton> Humidity</BootstrapButton>
          </Box>
        </BoxWrapper>
        <StyledFilter />
      </Container>
      <Container sx={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
        <BoxWrapper boxShadow={2}>
          <Box>
            <BootstrapButton> Particle-size</BootstrapButton>
          </Box>
        </BoxWrapper>
        <StyledFilter />
      </Container>
    </Container>
  )
}

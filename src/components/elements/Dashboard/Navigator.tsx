import { Box, Button, Link } from '@mui/material'
import React from 'react'

const buttons = [
    <Link key="one" href = '/dashboard/1'><Button variant = 'contained' >Dashboard 1</Button></Link>,
    <Link key="two" href = '/dashboard/2'><Button variant = 'contained'>Dashboard 2</Button></Link>,
    <Link key="three" href = '/dashboard/3'><Button variant='contained'>Dashboard 3</Button></Link>
]

const Navigator = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        margin: '10px',
        justifyContent: 'space-between',
        '& > *': {
          m: 1
        }
      }}
    >
        {buttons}
    </Box>
  )
}

export default Navigator

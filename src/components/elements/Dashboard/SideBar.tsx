import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded'
import Link from 'next/link'
import React, { Key } from 'react'
import { dashboards } from '../AddToDash'

type Anchor = 'top'

const DashBoardList: String[] = ['Dashboard 1', 'Dashboard 2', 'Dashboard 3']

export default function TemporaryDrawer (): JSX.Element {
  const [state, setState] = React.useState({
    top: false
  })

  const [header, setHeader] = React.useState<string>('')

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return
        }

        setState({ ...state, [anchor]: open })
      }

  const addDashboard = (anchor: Anchor): void => {
    DashBoardList.push('Dashboard ' + (DashBoardList.length + 1).toString())
    setState({ ...state, [anchor]: true })
    dashboards.push({
      title: 'Dashboard ' + (dashboards.length + 1).toString()
    })
  }

  const DropDownList = (anchor: Anchor): JSX.Element => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"

    >
      <List onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}>
        {DashBoardList.map((text, index) => (
          <ListItem key={text as Key} disablePadding>
            <Link href={'/dashboard/' + (index + 1).toString()} >
              <ListItemButton onClick={() => setHeader('Dashboard ' + (index + 1).toString())}> {/* Add Onclick-function that writes heading */}
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon >
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem key={'Add Dashboard'} disablePadding>
          <ListItemButton onClick={(() => addDashboard(anchor))}>
            <ListItemIcon>
              <DashboardCustomizeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={'Add Dashboard'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', justifyContent: 'center', alignItems: 'center', margin: '1% 3%', padding: '0' }}>
      <React.Fragment key={'top'}>
        <Button onClick={toggleDrawer('top', true)} style={{ width: '100%', height: '56px', borderRadius: '4px', border: '1px solid rgba(0, 0, 0, 0.229)' }}>Select Dashboard</Button>
        <Drawer
          anchor='top'
          open={state.top}
          onClose={toggleDrawer('top', false)}
        >
          {DropDownList('top')}
        </Drawer>
      </React.Fragment>
      <h1> {header} </h1>
    </div >
  )
}

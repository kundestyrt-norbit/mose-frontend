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
import React, { Key, useEffect } from 'react'
import { Dashboard, DashboardListItem } from './types'
import { v4 as uuidv4 } from 'uuid'
import { createDashboard, getDashboards } from '../../../utils/dashboardUtils'
import { TextField } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

type Anchor = 'top'

export default function TemporaryDrawer(): JSX.Element {
  const [state, setState] = React.useState({
    top: false
  })
  const [dashboardName, setDashboardName] = React.useState<string>('')

  const [dashboardList, setDashboardList] = React.useState<DashboardListItem[]>([])
  useEffect(() => {
    getDashboards().then(res => setDashboardList(res)).catch(err => console.log(err))
  }, [state])

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

  const addDashboard = (): void => {
    const dashboard: Dashboard = {
      dashboardId: uuidv4(),
      dashboardName: dashboardName ?? 'New Dashboard',
      sensors: []
    }
    console.log(dashboardList)

    createDashboard(dashboard).then(res => {
      setDashboardList([...dashboardList, { dashboardId: dashboard.dashboardId, dashboardName: dashboard.dashboardName }])
      // setState({ ...state, [anchor]: true })
    }
    ).catch((error) => {
      console.log(error)
    })
  }

  const removeDashboard = (dashboard: Dashboard): void => { // WORK IN PROGRESS
    dashboardList.pop(dashboard)
  }
  const DropDownList = (anchor: Anchor): JSX.Element => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation">
      <List onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}>
        {
          dashboardList.map((dashboardListItem, index) =>
          (<ListItem key={dashboardListItem.dashboardId as Key} disablePadding>
            <Link href={'/dashboard/' + dashboardListItem.dashboardId} >
              <ListItemButton> {/* Add Onclick-function that writes heading */}
                <ListItemIcon>
                  <DashboardRoundedIcon />
                </ListItemIcon >
                <ListItemText primary={dashboardListItem.dashboardName} />
              </ListItemButton>
            </Link>
            <DeleteForeverIcon sx={{ marginRight: '25px' }} />
          </ListItem>))}
      </List>
      <Divider />
      <List sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <ListItem sx={{ justifyContent: 'center' }}>
          <TextField id="name" label="DashboardName" variant="outlined" color='warning' sx={{ width: '100%' }} onChange={(e) => setDashboardName(e.target.value)}>{dashboardName}</TextField>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={(() => addDashboard())}>
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
    </div >
  )
}

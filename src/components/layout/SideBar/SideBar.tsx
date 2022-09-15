import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SwipeableDrawer,
  Theme,
  Typography,
  useMediaQuery
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Group from '@mui/icons-material/Group'
import NavItem from '../NavItem'
import Link from 'next/link'

interface SidebarProps {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
  open: boolean
}

const Sidebar = ({ open, toggleDrawer }: SidebarProps): JSX.Element => {
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

  const router = useRouter()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  })

  useEffect(
    /**
     * Close on initial render
     */
    () => {
      if (!router.isReady) {
        return
      }

      if (open) {
        toggleDrawer(false)
      }
    },
    [router.asPath]
  )

  const content = (
    <Stack sx={{ height: '100%' }}>
      <div>
        <Box sx={{ p: 3 }}>
          {/* <Link href="/">Hello</Link> */}
        </Box>
      </div>
      <Divider
        sx={{
          borderColor: '#2D3748',
          my: 3
        }}
      />
      <Stack sx={{ flexGrow: 1 }} spacing={2} px={2}>
        {items.map((item) => (
          <NavItem
            key={item.title}
            icon={item.icon}
            href={item.href}
            title={item.title}
          />
        ))}
      </Stack>
      <Divider sx={{ borderColor: '#2D3748' }} />
      <Box
        sx={{
          px: 2,
          py: 3
        }}
      >
        <Typography color="neutral.100" variant="subtitle2">
          Hva syns du om nettsiden?
        </Typography>
        <Typography color="neutral.500" variant="body2">
          Send oss ris eller ros her.
        </Typography>
        <Link href="/">
          <Button
            color="secondary"
            endIcon={<OpenInNewIcon />}
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
          >
            Gi tilbakemelding her
          </Button>
        </Link>
      </Box>
    </Stack>
  )

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    )
  }

  return (
    <SwipeableDrawer
      anchor="left"
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      {content}
    </SwipeableDrawer>
  )
}

const items = [
  {
    href: '/',
    icon: <Group fontSize="small" />,
    title: 'home'
  },
  {
    href: '/sensor',
    icon: <Group fontSize="small" />,
    title: 'sensors'
  },
  {
    href: '/login',
    icon: <Group fontSize="small" />,
    title: 'logIn'
  },
  {
    href: '/404',
    icon: <Group fontSize="small" />,
    title: 'Error'
  }
]

export default Sidebar

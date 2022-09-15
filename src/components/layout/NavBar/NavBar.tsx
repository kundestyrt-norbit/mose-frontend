import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  styled
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

interface NavbarProps {
  onSidebarOpen: () => void
}

const Navbar = ({ onSidebarOpen }: NavbarProps): JSX.Element => {
  return (
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
         onClick={onSidebarOpen}
        sx={{
          display: {
            xs: 'inline-flex',
            lg: 'none'
          }
        }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title="Notifications">
          <IconButton sx={{ ml: 1 }}>
            <Badge badgeContent={4} color="primary" variant="dot">
              <NotificationsIcon fontSize="small" />
          </Badge>
        </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton sx={{ ml: 1 }}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </DashboardNavbarRoot>
  )
}

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}))

export default Navbar

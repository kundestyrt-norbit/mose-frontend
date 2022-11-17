import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'
import NorbitExploreMore from './NorbitExploreMore'

const pages = ['Map', 'Dashboard', 'List']

function signOut (): void {
  Auth.signOut()
    .catch(err => console.log(err))
}

const ResponsiveAppBar = (): JSX.Element => {
  const router = useRouter()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position='static' sx={{ boxShadow: 'none' }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', boxShadow: 'none' }}>
          <Link href='/' style={{ border: '1px solid blue' }}>
            <NorbitExploreMore
              sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1, height: '4rem', width: '5rem', fontSize: '4rem' }}
              viewBox='0 0 442 196'
            />
          </Link>

          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', sm: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link href={'/' + page.toLowerCase()}>
                    <Typography textAlign='center'>{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <NorbitExploreMore
            sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1, height: '3rem', width: '4rem', fontSize: '3rem' }}
            viewBox='0 0 442 196'
          />
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              position: 'absolute',
              width: '50%',
              left: '25%',
              justifyContent: 'space-between',
              zIndex: 2
            }}
          >
            {pages.map((page) => (
              <Link key={page} href={'/' + page.toLowerCase()}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    display: 'block',
                    color: router.asPath.includes(page.toLowerCase())
                      ? 'white'
                      : 'black'
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <Button onClick={signOut} sx={{
            zIndex: 2
          }} variant='outlined' color='secondary'>Sign out</Button>
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(function (setting) {
                if (setting === 'Logout') {
                  return (<MenuItem key={setting} onClick={signOut}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>)
                } else {
                  return (<MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>)
                }
              }
              )}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar

import { createTheme } from '@mui/material'

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    border: Palette['primary']
  }
  interface PaletteOptions {
    border: PaletteOptions['primary']
  }
}

/**
 * A style theme used throughout the application.
 */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#f8a477', dark: '#f50057' },
    border: {
      main: '#f8a477'
    },
    background: {
      paper: '#f8a477',
      default: '#ffffed' // '#151515',
    },
    text: {
    }
  },
  typography: {
    fontFamily: ['Lato', 'Sans'].join(',')
  }

})

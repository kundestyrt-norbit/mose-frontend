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
    primary: { main: '#7895a7', dark: '#f50057' },
    border: {
      main: '#7895a7'
    },
    background: {
      paper: '#7895a7',
      default: '#f4f2f0' // '#151515',
    },
    text: {
    }
  },
  typography: {
    fontFamily: ['proxima-nova', 'sans-serif'].join(','),
    fontSize: 16,
    button: {
      fontWeight: 'bolder'
    }
  }

})

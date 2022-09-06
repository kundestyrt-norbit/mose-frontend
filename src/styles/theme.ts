import { createTheme } from '@mui/material';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    border: Palette['primary'];
  }
  interface PaletteOptions {
    border: PaletteOptions['primary'];
  }
}

/**
 * A style theme used throughout the application.
 */
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffbf00', dark: '#493d17' },
    border: {
      main: '#000',
    },
    background: {
      paper: '#202020',
      default: '#151515', //'#151515',
    },
    text: {},
  },
  typography: {
    fontFamily: ['Lato', 'Sans'].join(','),
  },
});

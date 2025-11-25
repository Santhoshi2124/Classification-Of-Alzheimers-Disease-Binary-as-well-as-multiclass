// import { createTheme } from '@mui/material/styles';

// const baseConfig = {
//   typography: {
//     fontFamily: 'Roboto, Arial, sans-serif',
//     h4: { fontWeight: 700 },
//     h5: { fontWeight: 600 },
//     h6: { fontWeight: 600 },
//   },
//   shape: {
//     borderRadius: 8,
//   },
// };

// export const lightTheme = createTheme({
//   ...baseConfig,
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#00796b', // A modern teal
//     },
//     secondary: {
//       main: '#c2185b', // A deep pink
//     },
//     background: {
//       default: '#f4f6f8',
//       paper: '#ffffff',
//     },
//   },
// });

// export const darkTheme = createTheme({
//   ...baseConfig,
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#4db6ac', // A lighter teal for dark mode
//     },
//     secondary: {
//       main: '#f48fb1', // A lighter pink for dark mode
//     },
//     background: {
//       default: '#121212',
//       paper: '#1e1e1e',
//     },
//   },
// });
import { createTheme } from '@mui/material/styles';

const baseConfig = {
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
};

export const lightTheme = createTheme({
  ...baseConfig,
  palette: {
    mode: 'light',
    primary: { main: '#00796b' },
    secondary: { main: '#c2185b' },
    background: { default: '#f4f6f8', paper: '#ffffff' },
  },
});

export const darkTheme = createTheme({
  ...baseConfig,
  palette: {
    mode: 'dark',
    primary: { main: '#4db6ac' },
    secondary: { main: '#f48fb1' },
    background: { default: '#121212', paper: '#1e1e1e' },
  },
});
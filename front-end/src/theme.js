import { createTheme } from '@mui/material';
import RegimeRoundObliqueBold from './fonts/RegimeRound-BoldObliqueRound.woff';
import RegimeRoundBold from './fonts/RegimeRound-BoldRound.woff';

// const regimeobBold = {
//   fontFamily: 'Regime',
//   fontStyle: 'normal',
//   fontDisplay: 'swap',
//   fontWeight: 700,
//   src: `
//     local('Regime'),
//     local('RegimeRound-BoldObliqueRound'),
//     url(${RegimeRoundObliqueBold}) format('woff')
//   `,
// };
// const regimeBold = {
//   fontFamily: 'Regime',
//   fontStyle: 'normal',
//   fontDisplay: 'swap',
//   fontWeight: 700,
//   src: `
//     local('Regime'),
//     local('RegimeRound-BoldRound')
//     url(${RegimeRoundBold}) format('woff')
//   `,
// };

export const MainTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#ffffff',
          contrastText: '#eaaa00',
        },
        secondary: {
          main: '#eaaa00',
          contrastText: '#ffffff',
        },
        background: {
          default: '#333333',
          paper: '#333333',
        },
        text: {
          primary: '#ffffff',
          secondary: '#eaaa00',
        },
      },
      typography: {
        fontFamily: [
          'Regime',
          'Helvetica',
        ].join(','),
        logo: {
          letterSpacing: -6,
          fontSize: 55,
          color: '#EAAA00',
          fontWeight:500,
        },
        h1: {
          fontSize: 65,
          fontWeight: 400,
          letterSpacing: -6,
        },
        h1emph: {
          fontSize: 65,
          fontWeight: 600,
          letterSpacing: -6,
          color: '#EAAA00',
        },
        h4Info: {
          fontFamily: "Helvetica",
          fontSize: 16,
          textTransform: 'uppercase',
          fontWeight: 600,
          color: '#F5F5F5',
        },
        h5Thin: {
          fontWeight: 200,
        }
      }
      
});
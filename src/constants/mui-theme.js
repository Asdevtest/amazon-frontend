import {createTheme} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'

const baseThemeSettings = {
  typography: {
    fontFamily: ['Manrope', 'sans-serif'],

    h5: {
      fontWeight: 500,
    },
  },

  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: '0px 5px 19px 0px rgb(90 97 105 / 12%)',
      },
    },

    MuiTableCell: {
      root: {
        padding: '10px',
      },
      body: {
        color: grey[600],
      },
    },
  },
}

export const lightTheme = createTheme({
  ...baseThemeSettings,

  palette: {
    primary: {
      main: '#007bff',
    },
    text: {
      primary: '#3d5170',
      general: '#001029',
      second: '#656565',
    },

    background: {
      main: '#fff',
      second: '#F8F8F8',
    },

    // icons: {
    //   navbar: '#000000',
    // },
  },
})

export const darkTheme = createTheme({
  ...baseThemeSettings,

  palette: {
    primary: {
      main: '#008CF1',
    },
    text: {
      primary: '#3d5170',
      general: '#fff',
      second: '#E1E1E1',
    },

    background: {
      main: '#2B2B34',
      second: '#21212B',
    },

    // icons: {
    //   navbar: '#fff',
    // },
  },
})

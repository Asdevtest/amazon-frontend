// import {createTheme} from '@mui/material'
import {grey} from '@mui/material/colors'
import {createTheme} from '@mui/material/styles'

const baseThemeSettings = {
  components: {
    MuiTablePagination: {
      classes: {
        root: {
          color: '#fff !important',
        },
        toolbar: {
          color: '#fff !important',
        },
      },

      styleOverrides: {
        root: {
          color: '#fff !important',
        },

        toolbar: {
          color: '#fff !important',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        // elevation1: {
        //   boxShadow: '0px 5px 19px 0px rgb(90 97 105 / 12%)',
        // },
        // root: {
        //   backgroundColor: '#21212B',
        //   boxSizing: 'border-box',
        // },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '10px',
        },
        body: {
          color: grey[600],
        },
      },
    },
  },

  typography: {
    fontFamily: ['Manrope', 'sans-serif'],

    h5: {
      fontWeight: 500,
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

      negativeMain: '#fff',
    },

    background: {
      main: '#fff',
      second: '#F8F8F8',
    },

    linearGradient: {
      successDashboardCard: 'linear-gradient(157deg,#fff 50%, #F2FBF7 50%)',
      negativeDashboardCard: 'linear-gradient(157deg,#fff 50%, #FBF2F2 50%)',

      hoverSuccessDashboardCard: 'linear-gradient(157deg,#fff 50%, #d8fded 50%)',
      hoverNegativeDashboardCard: 'linear-gradient(157deg,#fff 50%, #f8dede 50%)',
    },

    boxShadow: {
      main: '#DFDFDF',
    },

    input: {
      // disabled: 'rgba(0, 0, 0, 0.38)',
      disabled: '#C4C4C4',
      border: '#E0E0E0',
    },
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

      negativeMain: '#001029',
    },

    background: {
      main: '#2B2B34',
      second: '#21212B',
    },

    linearGradient: {
      successDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #001A15 50%);',
      negativeDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #001A15 50%);',

      hoverSuccessDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #2B2B34 50%);',
      hoverNegativeDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #2B2B34 50%);',
    },

    boxShadow: {
      main: 'rgba(31, 31, 31, 0.56)',
    },

    input: {
      disabled: '#36363F',
      border: '#424250',
    },
  },
})

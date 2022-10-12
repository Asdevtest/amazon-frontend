// import {createTheme} from '@mui/material'
import {grey} from '@mui/material/colors'
import {createTheme} from '@mui/material/styles'

const baseThemeComponentsSettings = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      elevation1: {
        boxShadow: '0px 5px 19px 0px rgb(90 97 105 / 12%)',
      },
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
}

const baseThemeSettings = {
  typography: {
    fontFamily: ['Manrope', 'sans-serif'],

    h5: {
      fontWeight: 500,
    },
  },
}

export const lightTheme = createTheme({
  ...baseThemeSettings,

  components: {
    ...baseThemeComponentsSettings,
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: '#001029',
        },

        toolbar: {
          color: '#001029',
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          border: '0 !important',
          boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
          color: '#001029',
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          // color: '#001029',

          overflow: 'hidden',

          border: `1px solid #E0E0E0`,
        },

        // input: {
        //   color: '#001029',
        // },

        // disabled: {
        //   color: '#001029',
        // },
      },
    },

    // MuiTypography: {
    //   styleOverrides: {
    //     root: {
    //       color: '#001029',
    //     },
    //   },
    // },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#001029',
        },
      },
    },
  },

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

      chatIncomeMessage: '#EBEBEB',
      chatMyMessage: '#CCE2FF',

      tableCurRow: '#baffba',
      red: '#FFC7C7',
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
      // disabled: 'normal',
      // disabled: 'rgba(0, 0, 0, 0.26)',
      border: '#E0E0E0',
    },
  },
})

export const darkTheme = createTheme({
  ...baseThemeSettings,

  components: {
    ...baseThemeComponentsSettings,
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: '#fff',
        },

        toolbar: {
          color: '#fff',
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#2B2B34',
          border: '0 !important',
          boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
          color: '#fff',
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          // color: '#fff',
          overflow: 'hidden',
          border: '1px solid #424250',
          // '&:disabled': {
          //   color: '#fff',
          // },
        },

        // input: {
        //   color: '#fff',
        // },

        // disabled: {
        //   // color: '#fff !important',
        //   backgroundColor: '#fff',

        //   '-webkit-text-fill-color': '#fff !important',
        // },
      },
    },

    // MuiTypography: {
    //   styleOverrides: {
    //     root: {
    //       color: '#fff',
    //     },
    //   },
    // },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#2B2B34',
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
  },

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

      chatIncomeMessage: '#36363F',
      chatMyMessage: '#384C68',

      tableCurRow: '#388E3C',
      red: '#2E0505',
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
      // disabled: '#36363F',
      // disabled: '#9999a8',

      disabled: '#a0a0a4',

      border: '#424250',
    },
  },
})

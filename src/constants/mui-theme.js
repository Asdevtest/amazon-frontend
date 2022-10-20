import {grey} from '@mui/material/colors'
import {createTheme} from '@mui/material/styles'

const baseThemeComponentsSettings = {
  // MuiButton: {
  //   defaultProps: {
  //     sx: {
  //       '&.Mui-disabled': {
  //         backgroundColor: '#a0a0a4',
  //       },
  //     },
  //   },
  //   styleOverrides: {
  //     root: {
  //       textTransform: 'none',
  //     },
  //   },
  // },

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
          color: '#001029',

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

    MuiButton: {
      defaultProps: {
        sx: {
          '&.Mui-disabled': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
            // color: '#001029',
          },
        },
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
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
      green: 'green',
    },

    background: {
      main: '#fff',
      second: '#F8F8F8',
      third: '#f4f4f4',
      chatIncomeMessage: '#EBEBEB',
      chatMyMessage: '#CCE2FF',

      tableCurRow: '#baffba',
      red: '#FFC7C7',
      green: '#D9FAE5',
      entryLeftPanel: 'linear-gradient(112.25deg, #CCE2FF 17.37%, #D9F1E3 79.14%)',
      disabled: 'rgba(0, 0, 0, 0.12)',
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

        paper: {
          backgroundColor: '#2B2B34',
          color: '#fff',
        },

        menu: {
          // backgroundColor: '#2B2B34',
          color: '#fff',
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },

    MuiNativeSelect: {
      // defaultProps: {
      //   sx: {backgroundColor: '#2B2B34 !important'},
      // },

      styleOverrides: {
        select: {
          '& > option': {
            backgroundColor: '#2B2B34 !important',
          },
        },
      },
    },

    MuiList: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },

    MuiInputBase: {
      // sx: {
      //   '&.Mui-disabled': {
      //     // backgroundColor: 'rgba(0, 0, 0, 0.12)',
      //     color: '#001029 !important',
      //   },
      // },
      styleOverrides: {
        root: {
          color: '#fff',
          overflow: 'hidden',
          border: '1px solid #424250',

          // '& >disabled': {
          //   color: '#001029 !important',
          // },

          // '&.Mui-disabled': {
          //   // backgroundColor: '#a0a0a4',
          //   color: '#fff',
          // },

          // '::-webkit-text-fill-color': {
          //   color: '#001029 !important',
          //   // color: '#001029',
          // },
        },

        // '&.Mui-disabled': {
        //   // backgroundColor: '#a0a0a4',
        //   color: '#fff',
        // },

        disabled: {
          color: '#001029 !important',

          // '::-webkit-text-fill-color': {
          //   color: '#001029 !important',
          //   // color: '#001029',
          // },
        },
      },
    },

    Mui: {
      styleOverrides: {
        disabled: {
          color: '#001029 !important',
        },
      },
    },

    MuiCheckbox: {
      defaultProps: {
        sx: {
          '&.Mui-disabled': {
            color: '#a0a0a4',
          },
        },
      },
    },

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

    MuiButton: {
      defaultProps: {
        sx: {
          '&.Mui-disabled': {
            backgroundColor: '#a0a0a4',
            color: '#fff',
          },
        },
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar': {
          backgroundColor: '#21212B',
        },

        '::-webkit-scrollbar-thumb': {
          // backgroundColor: '#2B2B34',
          backgroundColor: '#001029',
          // borderRadius: 10,
        },

        '::-webkit-scrollbar-button': {
          // backgroundColor: '#21212B',
          backgroundColor: '#2B2B34',
          outline: '1px solid #21212B',
        },

        // '::-webkit-scrollbar-track': {
        //   backgroundColor: '#2B2B34',
        //   // backgroundColor: '#fff',
        // },

        // '::-webkit-text-fill-color': {
        //   color: '#001029 !important',
        //   // color: '#001029',
        // },

        // '&:Mui-disabled': {
        //   // backgroundColor: '#a0a0a4',
        //   color: '#fff !important',
        // },
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
      green: '#2FE341',
    },

    background: {
      main: '#2B2B34',
      second: '#21212B',

      chatIncomeMessage: '#36363F',
      chatMyMessage: '#384C68',

      tableCurRow: '#388E3C',
      red: '#2E0505',
      green: '#388E3C',
      entryLeftPanel: '#2B2B34',
      disabled: '#a0a0a4',
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
      // disabled: '#fff',

      disabled: '#a0a0a4',

      border: '#424250',
    },
  },
})

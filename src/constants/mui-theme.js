// import {grey} from '@mui/material/colors'
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
}

const baseThemeSettings = {
  typography: {
    fontFamily: ['Manrope', 'sans-serif'].join(','),

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
          padding: '5px',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        sx: {
          '&.Mui-disabled': {
            // backgroundColor: 'rgba(0, 0, 0, 0.12)',
            // color: '#001029',
            backgroundColor: '#C4C4C4',
          },
        },
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.12)',
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        textarea: {
          cursor: 'auto',
        },

        a: {
          color: '#007bff',
          textDecoration: 'none',

          '&:hover': {
            opacity: 0.7,
          },
        },
      },
    },
  },

  palette: {
    mode: 'light',

    primary: {
      main: '#007bff',
    },
    text: {
      general: '#001029',
      second: '#656565',

      negativeMain: '#fff',
      green: 'green',
    },

    background: {
      general: '#fff',
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
      general: '#DFDFDF',
    },

    input: {
      // disabled: 'rgba(0, 0, 0, 0.38)',
      // disabled: '#C4C4C4',
      customDisabled: '#EBEBEB',

      // disabled: 'normal',
      // disabled: 'rgba(0, 0, 0, 0.26)',
      customBorder: '#E0E0E0',
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

        menuIconButton: {
          color: '#fff',
        },

        sortIcon: {
          color: '#fff',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          color: '#fff',
        },

        deleteIcon: {
          color: '#fff',
        },
      },
    },

    MuiIconButton: {
      defaultProps: {
        sx: {
          '&.Mui-disabled': {
            color: '#a0a0a4',
          },
        },
      },
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },

    // MuiSvgIcon: {
    //   styleOverrides: {
    //     root: {
    //       color: '#fff',
    //     },
    //   },
    // },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },

    MuiNativeSelect: {
      styleOverrides: {
        select: {
          '& > option': {
            backgroundColor: '#2B2B34 !important',
          },
        },
        icon: {
          color: '#fff',
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
      styleOverrides: {
        root: {
          color: '#fff',
          overflow: 'hidden',
          border: '1px solid #424250',
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

      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#2B2B34',
          color: '#fff',
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#fff',
          padding: '5px',
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

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#fff',
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar': {
          backgroundColor: '#21212B',
          cursor: 'pointer !important',
        },
        '::-webkit-scrollbar-thumb': {
          // backgroundColor: '#2B2B34',
          backgroundColor: '#001029',
          // borderRadius: 10,

          '&:hover': {
            backgroundColor: 'rgba(0, 16, 41, 0.7)',
          },
        },

        '::-webkit-scrollbar-button': {
          // backgroundColor: '#21212B',
          backgroundColor: '#2B2B34',
          outline: '1px solid #21212B',

          '&:hover': {
            backgroundColor: 'rgba(43, 43, 52, 0.7)',
          },
        },

        '::-webkit-scrollbar-corner': {
          backgroundColor: '#21212B',
        },

        textarea: {
          cursor: 'auto',
        },

        a: {
          color: '#008CF1',
          textDecoration: 'none',

          '&:hover': {
            opacity: 0.7,
          },
        },
      },
    },
  },

  palette: {
    // mode: 'dark',

    ...{
      primary: {
        main: '#008CF1',
      },
      text: {
        general: '#fff',
        second: '#E1E1E1',

        negativeMain: '#001029',
        green: '#2FE341',
        disabled: '#001029', // 'rgba(255, 255, 255, 0.5)',

        primary: '#fff',
        secondary: 'rgba(255, 255, 255, 0.7)',
      },

      action: {
        active: '#fff',
        disabled: 'rgba(255, 255, 255, 0.3)',
      },

      background: {
        general: '#2B2B34',
        second: '#21212B',

        chatIncomeMessage: '#36363F',
        chatMyMessage: '#384C68',

        tableCurRow: '#001A15', // '#388E3C',
        red: '#2E0505',
        green: '#388E3C',
        entryLeftPanel: '#2B2B34',
        disabled: '#a0a0a4',

        default: '#121212',
      },

      linearGradient: {
        successDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #001A15 50%);',
        negativeDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #001A15 50%);',

        hoverSuccessDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #388E3C 50%);',
        hoverNegativeDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #2E0505 50%);',
      },

      boxShadow: {
        general: 'rgba(31, 31, 31, 0.56)',
      },

      input: {
        customDisabled: '#a0a0a4',
        // customDisabled: '#21212B',

        // customDisabled: '#EBEBEB', // макет

        customBorder: '#424250',
      },
    },
  },
})

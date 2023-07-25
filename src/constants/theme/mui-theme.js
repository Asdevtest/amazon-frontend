// import {grey} from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

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

  MuiAvatar: {
    styleOverrides: {
      fallback: {
        width: '70% !important',
        height: '70% !important',
      },
    },
  },
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
      // Убрать
      defaultProps: {
        headerHeight: 65,
      },

      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          border: '0 !important',
          boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)', // Старый вид
          // boxShadow: '0px 2px 8px 2px rgba(31, 31, 31, 0.6)',
          color: '#001029',
        },
        // Убрать
        columnHeaders: {
          height: 65,
        },

        sortIcon: {
          width: 14,
          height: 14,
        },

        columnHeaderDraggableContainer: {
          position: 'relative',
          paddingRight: 20,
          flexDirection: 'row !important',
        },

        columnHeaderTitleContainer: {
          flexDirection: 'row !important',

          '.MuiDataGrid-columnHeaderTitleContainerContent': {
            width: '100%',
          },
        },

        menuIconButton: {
          zIndex: 1000,
          position: 'absolute !important',
          right: -7,
          // visibility: 'visible !important',
          width: '18px !important',
          height: '18px !important',

          '.MuiSvgIcon-root': {
            width: 14,
            height: 14,
          },
        },

        iconButtonContainer: {
          '.MuiIconButton-root': {
            width: '18px !important',
            height: '18px !important',
          },
        },

        iconSeparator: {
          padding: '0 1px',
        },
      },
    },

    MuiNativeSelect: {
      styleOverrides: {
        select: {
          '& > option': {
            textAlign: 'center',
          },
        },
        // icon: {
        //   color: '#fff',
        // },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#001029',

          overflow: 'hidden',

          border: '1px solid #E0E0E0',
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

    MuiSvgIcon: {
      styleOverrides: {
        // root: {
        //   color: '#fff',
        // },
        colorPrimary: {
          color: '#007bff !important',
        },
      },
    },

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
            backgroundColor: '#B3D1FB',
            color: '#F9FCFF',
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

        'input[type="number"]::-webkit-outer-spin-button': {
          // '-webkit-appearance': 'none',
          WebkitAppearance: 'none',
          margin: 0,
        },
        'input[type="number"]::-webkit-inner-spin-button': {
          // '-webkit-appearance': 'none',
          WebkitAppearance: 'none',
          margin: 0,
        },
      },
    },
  },

  palette: {
    mode: 'light',

    primary: {
      main: '#007bff',
      mainRgb: '0, 123, 255',
    },
    text: {
      general: '#001029',
      second: '#656565',

      negativeMain: '#fff',
      gray: '#C4C4C4',
      green: 'green',
      red: '#DD2121',
    },

    button: {
      disabledText: '#F9FCFF',
      disabledBackground: '#B3D1FB',
      disabledSuccessText: '#E5FFEF',
      disabledSuccessBackground: '#B3E7C7',
      disabledDangerText: '#E5FFEF',
      disabledDangerBackground: '#FEB9B9',
    },

    background: {
      general: '#fff',
      second: '#F8F8F8',
      third: '#f4f4f4',
      chatIncomeMessage: '#EBEBEB',
      chatMyMessage: '#CCE2FF',
      searchSelectHover: '#F4F4F4',
      tableCurRow: '#baffba',
      red: '#FFC7C7',
      green: '#D9FAE5',
      darkBlue: '#006CFF',
      greenGradient: 'linear-gradient(180deg, #00B746 0%, #03A03F 100%)',
      yellow: '#F5CF00',
      entryLeftPanel: 'linear-gradient(112.25deg, #CCE2FF 17.37%, #D9F1E3 79.14%)',
      disabled: 'rgba(0, 0, 0, 0.12)',
      disabledDangerBtn: 'linear-gradient(180deg, rgba(255,22,22, .5) 0%, rgb(223,12,12,.5) 100%)',
    },

    linearGradient: {
      successDashboardCard: 'linear-gradient(157deg,#fff 50%, #F2FBF7 50%)',
      negativeDashboardCard: 'linear-gradient(157deg,#fff 50%, #FBF2F2 50%)',

      hoverSuccessDashboardCard: 'linear-gradient(157deg,#fff 50%, #d8fded 50%)',
      hoverNegativeDashboardCard: 'linear-gradient(157deg,#fff 50%, #f8dede 50%)',
    },

    boxShadow: {
      general: 'rgba(190, 190, 190, 0.15)',

      paper: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',

      yellow:
        'linear-gradient(90deg, rgba(243, 175, 0, 0.5) 0%, rgba(243, 175, 0, 0) 0.77%, rgba(243, 175, 0, 0) 99.23%, rgba(243, 175, 0, 0.5) 100%), linear-gradient(180deg, rgba(243, 175, 0, 0.5) 0%, rgba(243, 175, 0, 0) 18.05%, rgba(243, 175, 0, 0) 83.72%, rgba(243, 175, 0, 0.5) 100%)',

      red: 'linear-gradient(90deg, rgba(243, 0, 0, 0.5) 0%, rgba(243, 0, 0, 0) 0.77%, rgba(243, 0, 0, 0) 99.23%, rgba(243, 0, 0, 0.5) 100%), linear-gradient(180deg, rgba(243, 0, 0, 0.5) 0%, rgba(243, 0, 0, 0) 18.05%, rgba(243, 0, 0, 0) 83.72%, rgba(243, 0, 0, 0.5) 100%)',

      imageList: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    },

    input: {
      // disabled: 'rgba(0, 0, 0, 0.38)',
      // disabled: '#C4C4C4',
      customDisabled: '#EBEBEB',

      // disabled: 'normal',
      // disabled: 'rgba(0, 0, 0, 0.26)',
      customBorder: '#E0E0E0',
    },

    other: {
      rejected: '#D70D0D',
      succes: '#0B903E',
      tableActiveFilterBtn: '5px solid #0460DE',
      ideaProductSheld: 'url(/assets/icons/idea-trgl.svg)',

      ideaProductSheldGreen: 'url(/assets/icons/green-sheld.svg)',
      ideaProductSheldYellow: 'url(/assets/icons/yellow-sheld.svg)',
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
      // Убрать
      defaultProps: {
        headerHeight: 65,
      },

      styleOverrides: {
        root: {
          backgroundColor: '#2B2B34',
          border: '0 !important',
          // boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)', // Старый вид
          boxShadow: '0px 2px 8px 2px rgba(31, 31, 31, 0.6) !important', // Новый вид
          color: '#fff',

          // border: '1px solid rgba(81, 81, 81, 1) !important',
        },

        columnSeparator: {
          color: 'rgba(81, 81, 81, 1)',
        },

        columnHeaders: {
          borderBottom: '1px solid rgba(81, 81, 81, 1)',

          // Убрать
          height: 65,
        },

        row: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(76, 161, 222, 0.16)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },

        paper: {
          backgroundColor: '#2B2B34',
          color: '#fff',
        },

        menu: {
          // backgroundColor: '#2B2B34',
          color: '#fff',
        },

        sortIcon: {
          color: '#fff !important',
          width: 14,
          height: 14,
        },

        cell: {
          borderBottom: '1px solid rgba(81, 81, 81, 1)',
        },

        columnHeaderDraggableContainer: {
          flexDirection: 'row !important',
          position: 'relative',
        },

        columnHeaderTitleContainer: {
          flexDirection: 'row !important',
          paddingRight: 20,

          '.MuiDataGrid-columnHeaderTitleContainerContent': {
            width: '100%',
          },
        },

        menuIconButton: {
          color: '#fff',
          zIndex: 1000,
          position: 'absolute !important',
          right: -7,
          // visibility: 'visible !important',
          width: '18px !important',
          height: '18px !important',

          '.MuiSvgIcon-root': {
            width: 14,
            height: 14,
          },
        },

        iconButtonContainer: {
          '.MuiIconButton-root': {
            width: '18px !important',
            height: '18px !important',
          },
        },

        iconSeparator: {
          padding: '0 1px',
        },
        //
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
          // background: 'red',
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        // root: {
        //   color: '#fff',
        // },
        colorPrimary: {
          color: '#4CA1DE !important',
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
      styleOverrides: {
        select: {
          '& > option': {
            backgroundColor: '#2B2B34 !important',
            // paddingLeft: '10px !important',
            textAlign: 'center',
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
      //
      defaultProps: {
        // добавлен весь объект defaultProps, удалить если нужно вернуться к прошлому виду
        sx: {
          '& .MuiInputBase-input.Mui-disabled': {
            backgroundColor: '#36363F',
            WebkitTextFillColor: '#fff',
          },
        },
      },
      //
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
          // backgroundColor: '#21212B',

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
            backgroundColor: '#2E4760',
            color: '#8291A0',
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
          backgroundColor: '#25252D',
          cursor: 'pointer !important',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#53535B',
          border: '2px solid #25252D',
          borderTop: 'none',
          borderBottom: 'none',

          '&:hover': {
            backgroundColor: 'rgba(83, 83, 91, 0.7)',
          },
        },

        '::-webkit-scrollbar-button': {
          backgroundColor: '#25252D',
          outline: '1px solid #25252D',

          '&:hover': {
            backgroundColor: 'rgba(43, 43, 52, 0.7)',
          },
        },

        '::-webkit-scrollbar-button:vertical:start:increment': {
          display: 'none',
        },

        '::-webkit-scrollbar-button:vertical:end:decrement': {
          display: 'none',
        },

        '::-webkit-scrollbar-button:horizontal:start:increment': {
          display: 'none',
        },

        '::-webkit-scrollbar-button:horizontal:end:decrement': {
          display: 'none',
        },

        '::-webkit-scrollbar-corner': {
          backgroundColor: '#21212B',
        },

        'input[type="number"]::-webkit-outer-spin-button': {
          // '-webkit-appearance': 'none',
          WebkitAppearance: 'none',
          margin: 0,
        },
        'input[type="number"]::-webkit-inner-spin-button': {
          // '-webkit-appearance': 'none',
          WebkitAppearance: 'none',
          margin: 0,
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
    // mode: 'dark', // при выставлении меняет некотрые стили по умолчанию

    ...{
      primary: {
        // main: '#008CF1',
        main: '#4CA1DE',
        mainRgb: '76, 161, 222',
      },
      text: {
        general: '#fff',
        second: '#E1E1E1',

        gray: 'gray',
        red: '#DD2121',

        negativeMain: '#001029',
        green: '#2FE341',
        disabled: '#001029', // 'rgba(255, 255, 255, 0.5)',

        primary: '#fff',
        secondary: 'rgba(255, 255, 255, 0.7)',
      },

      button: {
        disabledText: '#8291A0',
        disabledBackground: '#2E4760',
        disabledSuccessText: '#41715A',
        disabledSuccessBackground: '#184831',
        disabledDangerText: '#E5FFEF',
        disabledDangerBackground: '#451F27',
      },

      action: {
        active: '#fff',
        disabled: 'rgba(255, 255, 255, 0.3)',
      },

      background: {
        general: '#2B2B34',
        second: '#21212B',

        searchSelectHover: '#25252D',
        chatIncomeMessage: '#36363F',
        chatMyMessage: '#384C68',
        darkBlue: '#4CA1DE',

        tableCurRow: '#001A15', // '#388E3C',
        red: '#2E0505',
        green: '#001A15',
        greenGradient: 'linear-gradient(180deg, #00B746 0%, #03A03F 100%)',
        yellow: '#FEF0A6',
        entryLeftPanel: '#2B2B34',
        disabled: '#a0a0a4',

        default: '#121212',
        disabledDangerBtn: '#4F2026',
      },

      linearGradient: {
        successDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #001A15 50%);',

        // negativeDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #001A15 50%);',
        negativeDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #2E0505 50%);',

        hoverSuccessDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #388E3C 50%);',

        // hoverNegativeDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #2E0505 50%);',
        hoverNegativeDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #8C0000 50%);',
      },

      boxShadow: {
        general: 'rgba(31, 31, 31, 0.6)',

        paper: '0px 2px 8px 2px rgba(31, 31, 31, 0.6)',

        yellow:
          'linear-gradient(90deg, rgba(243, 175, 0, 0.5) 0%, rgba(243, 175, 0, 0) 0.77%, rgba(243, 175, 0, 0) 99.23%, rgba(243, 175, 0, 0.5) 100%), linear-gradient(180deg, rgba(243, 175, 0, 0.5) 0%, rgba(243, 175, 0, 0) 18.05%, rgba(243, 175, 0, 0) 83.72%, rgba(243, 175, 0, 0.5) 100%)',

        red: 'linear-gradient(90deg, rgba(243, 0, 0, 0.5) 0%, rgba(243, 0, 0, 0) 0.77%, rgba(243, 0, 0, 0) 99.23%, rgba(243, 0, 0, 0.5) 100%), linear-gradient(180deg, rgba(243, 0, 0, 0.5) 0%, rgba(243, 0, 0, 0) 18.05%, rgba(243, 0, 0, 0) 83.72%, rgba(243, 0, 0, 0.5) 100%)',

        imageList: 'inset -4px -4px 13px rgba(1, 1, 1, 0.17)',
      },

      input: {
        // customDisabled: '#a0a0a4', // снять коммент это если нужно будет вернуться к прошлому виду
        customBorder: '#424250', // снять коммент это если нужно будет вернуться к прошлому виду, если снова будешь исправлять скажи мне, больше не буду трогать это (18.01.23)

        // customDisabled: '#21212B',
        // customDisabled: '#EBEBEB', // макет

        customDisabled: '#36363F', // удалить это если нужно будет вернуться к прошлому виду
      },

      other: {
        rejected: '#D70D0D',
        succes: '#0B903E',
        tableActiveFilterBtn: '5px solid #4CA1DE',
        ideaProductSheld: 'url(/assets/icons/idea-trgl-dark-theme.svg)',

        ideaProductSheldGreen: 'url(/assets/icons/green-sheld.svg)',
        ideaProductSheldYellow: 'url(/assets/icons/yellow-sheld.svg)',
      },
    },
  },
})

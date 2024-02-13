import { createTheme } from '@mui/material/styles'

const baseThemeComponentsSettings = {
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

export const globalStyles = theme => ({
  '::-webkit-scrollbar': {
    display: 'block !important',
    width: '6px',
    height: '6px',
    cursor: 'pointer',
  },
  '::-webkit-scrollbar-track': {
    borderRadius: '8px',
    backgroundColor: 'transparent !important',
    border: 'none !important',
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '8px',
    backgroundColor: theme.palette.text.gray,
  },
  '::-webkit-scrollbar-corner': {
    backgroundColor: 'transparent !important',
  },
  '.MuiDataGrid-menuIcon, .MuiDataGrid-iconButtonContainer': {
    visibility: 'visible !important',
  },
  '.MuiDataGrid-main': {
    borderRadius: '0 0 20px 20px',
  },
  '.MuiDataGrid-columnSeparator--sideRight': {
    right: '-3px !important',
  },
  '.MuiDataGrid-columnHeader': {
    padding: '0 5px !important',
  },
  '.MuiDataGrid-columnHeaderCheckbox': {
    '.MuiDataGrid-columnHeaderDraggableContainer': {
      '.MuiDataGrid-columnHeaderTitleContainer': {
        paddingRight: '0 !important',
      },
    },
  },
})

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
          height: 40,
          minHeight: '40px !important',
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          border: 'none',
          boxShadow: '0 2px 10px 2px rgba(190, 190, 190, 0.15)',
          color: '#001029',
          borderRadius: 20,
        },

        row: {
          cursor: 'pointer',
          transition: '0.3s ease',
        },

        sortIcon: {
          width: 14,
          height: 14,
        },

        columnHeaderDraggableContainer: {
          flexDirection: 'row !important',
          position: 'relative',
        },

        columnHeaderTitleContainer: {
          flexDirection: 'row !important',
          paddingRight: 25,

          '.MuiDataGrid-columnHeaderTitleContainerContent': {
            width: '100%',
          },
        },

        menuIconButton: {
          zIndex: 50,
          position: 'absolute !important',
          right: -2,
          width: '20px !important',
          height: '20px !important',

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
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#001029',
          overflow: 'hidden',
          border: '1px solid #E0E0E0',
        },
      },
    },

    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
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
          WebkitAppearance: 'none',
          margin: 0,
        },
        'input[type="number"]::-webkit-inner-spin-button': {
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
      gray: '#C4C4C4',
      red: '#DD2121',
      negativeMain: '#fff',
      green: 'green',
    },

    button: {
      disabledText: '#F9FCFF',
      disabledBackground: '#B3D1FB',
      disabledSuccessText: '#E5FFEF',
      disabledSuccessBackground: '#B3E7C7',
      disabledDangerText: '#E5FFEF',
      disabledDangerBackground: '#FEB9B9',

      casualBorder: 'var(--Gray-Scale-Gray-100, #E6E6E6)',
      casualDisabledBorder: 'var(--Gray-Scale-Gray-100, #E6E6E6)',
      casualHoverBorder: 'var(--Gray-Scale-Gray-100, #E6E6E6)',
      casualDisabledText: '#E0E0E0',

      defaultBoxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
      primaryHoverColor: '#0F5BB6',
      primaryHoverBackground: '#F4F9FF',
      primaryDisabledColor: '#D7E8FF',

      errorHoverColor: '#912018',
      errorHoverBackground: '#FFF0EF',
      errorDisabledColor: '#FFF0EE',

      successHoverColor: '#216C24',
      successHoverBackground: '#EFFDF4',
      successDisabledColor: '#B3E7C7',
    },

    orderStatus: {
      red: '#FF1616',
    },

    background: {
      general: '#fff',
      second: '#F8F8F8',
      third: '#f4f4f4',
      chatIncomeMessage: '#EBEBEB',
      chatMyMessage: '#CCE2FF',
      yellowRow: '#FFFDF3',
      greenRow: 'rgba(0, 64, 0, 0.2)',
      redRow: '#FFF3F3',
      searchSelectHover: '#F4F4F4',
      tableCurRow: '#baffba',
      red: '#FFC7C7',
      green: '#D9FAE5',
      darkBlue: '#006CFF',
      yellow: '#0164F4',
      entryLeftPanel: 'linear-gradient(112.25deg, #CCE2FF 17.37%, #D9F1E3 79.14%)',
      disabled: 'rgba(0, 0, 0, 0.12)',
      activeChat: '#E7F1FF',
      secondary: 'rgba(200, 200, 200, 1)',
    },

    customSwitcher: {
      background: '#D9E0E8',
      indicator: '#fff',
      text: '#001029',
      activeText: '#007bff',
      headerBackground: '#F4F4F4',
      switch: '#E3E3E3',
    },

    linearGradient: {
      successDashboardCard: 'linear-gradient(157deg,#fff 50%, #F2FBF7 50%)',
      negativeDashboardCard: 'linear-gradient(157deg,#fff 50%, #FBF2F2 50%)',
      hoverSuccessDashboardCard: 'linear-gradient(157deg,#fff 50%, #d8fded 50%)',
      hoverNegativeDashboardCard: 'linear-gradient(157deg,#fff 50%, #f8dede 50%)',
    },

    boxShadow: {
      general: 'rgba(190, 190, 190, 0.15)',
      paper: '0 2px 10px 2px rgba(190, 190, 190, 0.15)',
      yellow:
        'linear-gradient(90deg, rgba(243, 175, 0, 0.5) 0%, rgba(243, 175, 0, 0) 0.77%, rgba(243, 175, 0, 0) 99.23%, rgba(243, 175, 0, 0.5) 100%), linear-gradient(180deg, rgba(243, 175, 0, 0.5) 0%, rgba(243, 175, 0, 0) 18.05%, rgba(243, 175, 0, 0) 83.72%, rgba(243, 175, 0, 0.5) 100%)',
      red: 'linear-gradient(90deg, rgba(243, 0, 0, 0.5) 0%, rgba(243, 0, 0, 0) 0.77%, rgba(243, 0, 0, 0) 99.23%, rgba(243, 0, 0, 0.5) 100%), linear-gradient(180deg, rgba(243, 0, 0, 0.5) 0%, rgba(243, 0, 0, 0) 18.05%, rgba(243, 0, 0, 0) 83.72%, rgba(243, 0, 0, 0.5) 100%)',
      imageList: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
      filter: '0 -4px 13px 0 rgba(135, 135, 135, 0.15) inset',
      casualBoxShadow: '0px 2.18px 4.36px 0px rgba(97, 97, 97, 0.18), 0px 1.09px 2.18px 0px rgba(97, 97, 97, 0.18)',
      casualHover: '#F4F4F4',
    },

    input: {
      customDisabled: '#EBEBEB',
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

    fileIcons: {
      xls: '#0F8105',
      pdf: '#D70D0D',
      doc: '#0A6FE8',
      txt: '#F17048',
      zip: '#6D56F8',
      file: '#475467',
      icon: '#E9F0FA',
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
          height: 40,
          minHeight: '40px !important',
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#2B2B34',
          border: 'none',
          boxShadow: '0 2px 8px 2px rgba(31, 31, 31, 0.6)',
          color: '#fff',
          borderRadius: 20,
        },
        overlay: {
          backgroundColor: '#2B2B34',
        },

        row: {
          cursor: 'pointer',
          transition: '0.3s ease',

          '&.Mui-selected': {
            backgroundColor: 'rgba(76, 161, 222, 0.16)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },

        sortIcon: {
          color: '#fff',
          width: 14,
          height: 14,
        },

        columnSeparator: {
          color: 'rgba(81, 81, 81, 1)',
        },

        columnHeaders: {
          borderBottom: '1px solid rgba(81, 81, 81, 1)',
          height: 65,
        },

        paper: {
          backgroundColor: '#2B2B34',
          color: '#fff',
        },

        menu: {
          color: '#fff',
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
          paddingRight: 25,

          '.MuiDataGrid-columnHeaderTitleContainerContent': {
            width: '100%',
          },
        },

        menuIconButton: {
          color: '#fff',
          zIndex: 50,
          position: 'absolute !important',
          right: -3,
          width: '20px !important',
          height: '20px !important',

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

    MuiSvgIcon: {
      styleOverrides: {
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
          padding: 0,
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

          '&.Mui-focused': {
            border: '1px solid #4CA1DE',
          },
        },
        input: {
          '&.Mui-disabled': {
            backgroundColor: '#36363F',
            WebkitTextFillColor: '#fff',
          },
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
        'input[type="number"]::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        'input[type="number"]::-webkit-inner-spin-button': {
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
      disabled: '#001029',

      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },

    button: {
      disabledText: '#8291A0',
      disabledBackground: '#2E4760',
      disabledSuccessText: '#41715A',
      disabledSuccessBackground: '#184831',
      disabledDangerText: '#636369',
      disabledDangerBackground: '#451F27',

      casualBorder: '#424250',
      casualDisabledBorder: 'rgba(43, 43, 52, 0.89)',
      casualHoverBorder: '#5A5A67',
      casualDisabledText: 'rgba(255, 255, 255, 0.17)',

      defaultBoxShadow:
        '0px 2px 11px 2px #1F1F1F, 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      primaryHoverColor: '#4CA1DE',
      primaryHoverBackground: '#375674',
      primaryDisabledColor: '#2E4760',

      errorHoverColor: '#8C0000',
      errorHoverBackground: '#451F27',
      errorDisabledColor: '#471721',

      successHoverColor: '#29892D',
      successHoverBackground: '#204833',
      successDisabledColor: '#184831',
    },

    action: {
      active: '#fff',
      disabled: 'rgba(255, 255, 255, 0.3)',
    },

    orderStatus: {
      red: '#DD2121',
    },

    background: {
      general: '#2B2B34',
      second: '#21212B',
      third: '#25252D',
      searchSelectHover: '#25252D',
      chatIncomeMessage: '#36363F',
      chatMyMessage: '#384C68',
      darkBlue: '#4CA1DE',
      yellowRow: '#2F2C23',
      greenRow: 'rgba(0, 64, 0, 0.5)',
      redRow: '#2F2329',
      tableCurRow: '#001A15',
      red: '#2E0505',
      green: '#001A15',
      yellow: '#FEF0A6',
      entryLeftPanel: '#2B2B34',
      disabled: '#a0a0a4',
      activeChat: '#384C68',
      secondary: 'rgb(80, 80, 80, 1)',
    },

    customSwitcher: {
      background: '#272730',
      indicator: '#31313A',
      text: '#5C6A7A',
      activeText: '#4CA1DE',
      headerBackground: '#25252D',
      switch: '#667085',
    },

    linearGradient: {
      successDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #001A15 50%);',
      negativeDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #2E0505 50%);',
      hoverSuccessDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #388E3C 50%);',
      hoverNegativeDashboardCard: 'linear-gradient(157deg,#2B2B34 50%, #8C0000 50%);',
    },

    boxShadow: {
      general: 'rgba(31, 31, 31, 0.6)',
      paper: '0 2px 8px 2px rgba(31, 31, 31, 0.6)',
      yellow:
        'linear-gradient(90deg, rgba(243, 175, 0, 0.5) 0%, rgba(243, 175, 0, 0) 0.77%, rgba(243, 175, 0, 0) 99.23%, rgba(243, 175, 0, 0.5) 100%), linear-gradient(180deg, rgba(243, 175, 0, 0.5) 0%, rgba(243, 175, 0, 0) 18.05%, rgba(243, 175, 0, 0) 83.72%, rgba(243, 175, 0, 0.5) 100%)',
      red: 'linear-gradient(90deg, rgba(243, 0, 0, 0.5) 0%, rgba(243, 0, 0, 0) 0.77%, rgba(243, 0, 0, 0) 99.23%, rgba(243, 0, 0, 0.5) 100%), linear-gradient(180deg, rgba(243, 0, 0, 0.5) 0%, rgba(243, 0, 0, 0) 18.05%, rgba(243, 0, 0, 0) 83.72%, rgba(243, 0, 0, 0.5) 100%)',
      imageList: 'inset -4px -4px 13px rgba(1, 1, 1, 0.17)',
      filter: '-4px -4px 13px 0 rgba(1, 1, 1, 0.17) inset',
      casualBoxShadow:
        '0px 2px 11px 2px #1F1F1F, 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      casualHover: '#474753',
    },

    input: {
      customBorder: '#424250',
      customDisabled: '#36363F',
    },

    other: {
      rejected: '#D70D0D',
      succes: '#0B903E',
      tableActiveFilterBtn: '5px solid #4CA1DE',
      ideaProductSheld: 'url(/assets/icons/idea-trgl-dark-theme.svg)',
      ideaProductSheldGreen: 'url(/assets/icons/green-sheld.svg)',
      ideaProductSheldYellow: 'url(/assets/icons/yellow-sheld.svg)',
    },

    fileIcons: {
      xls: '#02AE44',
      pdf: '#DD2121',
      doc: '#4CA1DE',
      txt: '#E37451',
      zip: '#8B79F9',
      file: '#A2ADBD',
      icon: '#475467',
    },
  },
})

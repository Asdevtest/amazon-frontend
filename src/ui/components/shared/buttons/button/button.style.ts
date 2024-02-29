import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => {
  const primaryMain = theme.palette.primary.main
  const redMain = theme.palette.text.red
  const successMain = theme.palette.text.green
  const backgroundGeneral = theme.palette.background.general

  const defaultBoxShadow = theme.palette.button.defaultBoxShadow
  const primaryHoverColor = theme.palette.button.primaryHoverColor
  const primaryHoverBackground = theme.palette.button.primaryHoverBackground
  const primaryDisabledColor = theme.palette.button.primaryDisabledColor

  const errorHoverColor = theme.palette.button.errorHoverColor
  const errorHoverBackground = theme.palette.button.errorHoverBackground
  const errorDisabledColor = theme.palette.button.errorDisabledColor

  const successHoverColor = theme.palette.button.successHoverColor
  const successHoverBackground = theme.palette.button.successHoverBackground
  const successDisabledColor = theme.palette.button.successDisabledColor

  return {
    root: {
      position: 'relative',
      height: 40,
      fontSize: 14,
      fontWeight: 600,
      whiteSpace: 'pre-line',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 20px',

      transition: 'all 0.5s ease',
      cursor: 'pointer',
      boxShadow: defaultBoxShadow,

      borderRadius: '100px',

      '&:disabled': {
        cursor: 'default',
      },

      margin: '0 3px 3px 0',
    },

    transparent: {
      padding: '0 5px',
      margin: '0',
      color: theme.palette.text.general,
      background: 'transparent',
      '&:hover': {
        color: theme.palette.text.general,
        background: 'transparent',
      },
      '&:disabled': {
        color: theme.palette.text.general,
        background: 'transparent',
      },

      boxShadow: 'none',
    },

    default: {
      color: primaryMain,
      backgroundColor: backgroundGeneral,

      '&:hover': {
        color: primaryHoverColor,
        backgroundColor: primaryHoverBackground,
      },

      '&:disabled': {
        color: primaryDisabledColor,
        backgroundColor: backgroundGeneral,
      },
    },

    primary: {
      color: theme.palette.primaryButton.color,
      backgroundColor: theme.palette.primaryButton.backgroundColor,

      '&:hover': {
        color: theme.palette.primaryButton.hoverColor,
        backgroundColor: theme.palette.primaryButton.hoverBackgroundColor,
      },

      '&:disabled': {
        color: theme.palette.primaryButton.disabledColor,
        backgroundColor: theme.palette.primaryButton.disabledBackgroundColor,
      },
    },

    outlinedPrimary: {
      color: theme.palette.primaryButton.backgroundColor,
      border: `2px solid currentColor`,
      backgroundColor: 'transparent',

      '&:hover': {
        color: theme.palette.primaryButton.hoverBackgroundColor,
        backgroundColor: 'transparent',
      },

      '&:disabled': {
        color: theme.palette.primaryButton.disabledBackgroundColor,
        backgroundColor: 'transparent',
      },
    },

    success: {
      color: theme.palette.succesButton.color,
      backgroundColor: theme.palette.succesButton.backgroundColor,

      '&:hover': {
        color: theme.palette.succesButton.hoverColor,
        backgroundColor: theme.palette.succesButton.hoverBackgroundColor,
      },

      '&:disabled': {
        color: theme.palette.succesButton.disabledColor,
        backgroundColor: theme.palette.succesButton.disabledBackgroundColor,
      },
    },

    outlinedSuccess: {
      color: theme.palette.succesButton.backgroundColor,
      border: `2px solid currentColor`,
      backgroundColor: 'transparent',

      '&:hover': {
        color: theme.palette.succesButton.hoverBackgroundColor,
        backgroundColor: 'transparent',
      },

      '&:disabled': {
        color: theme.palette.succesButton.disabledBackgroundColor,
        backgroundColor: 'transparent',
      },
    },

    danger: {
      color: theme.palette.dangerButton.color,
      backgroundColor: theme.palette.dangerButton.backgroundColor,

      '&:hover': {
        color: theme.palette.dangerButton.hoverColor,
        backgroundColor: theme.palette.dangerButton.hoverBackgroundColor,
      },

      '&:disabled': {
        color: theme.palette.dangerButton.disabledColor,
        backgroundColor: theme.palette.dangerButton.disabledBackgroundColor,
      },
    },

    outlinedDanger: {
      color: theme.palette.dangerButton.outlinedColor,
      border: `2px solid ${theme.palette.dangerButton.backgroundColor}`,
      backgroundColor: 'transparent',

      '&:hover': {
        color: theme.palette.dangerButton.outlinedHoverColor,
        backgroundColor: 'transparent',
      },

      '&:disabled': {
        color: theme.palette.dangerButton.outlinedDisabledColor,
        backgroundColor: 'transparent',
      },
    },

    fullWidth: {
      width: '100%',
    },

    tooltipsWrapper: {
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      zIndex: '10',
    },

    tooltipsCenterWrapper: {
      position: 'absolute',
      top: 'calc(50% - 10.5px)',
      right: 15,
      zIndex: '10',
    },

    tooltip: {
      width: '18px !important',
      height: '18px !important',
    },

    tableTooltip: {
      width: '14px !important',
      height: '14px !important',
    },

    tooltipInfo: {
      color: primaryMain,
    },

    casual: {
      borderRadius: '100px',
      fontWeight: 500,
      color: theme.palette.text.general,
      backgroundColor: backgroundGeneral,
      boxShadow: theme.palette.boxShadow.casualBoxShadow,
      border: `2px solid ${theme.palette.button.casualBorder}`,
      '&:hover': {
        boxShadow: theme.palette.boxShadow.casualBoxShadow,
        backgroundColor: `${theme.palette.boxShadow.casualHover}`,
        border: `2px solid ${theme.palette.button.casualHoverBorder}`,
      },
      '&:disabled': {
        color: theme.palette.button.casualDisabledText,
        backgroundColor: backgroundGeneral,
        boxShadow: theme.palette.boxShadow.casualBoxShadow,
        border: `2px solid ${theme.palette.button.casualDisabledBorder}`,
      },
    },

    tableButton: {
      height: '30px',
    },

    smallButton: {
      height: '24px',
    },

    iconButton: {
      borderRadius: '100%',
      width: '28px',
      height: '28px',
      padding: 0,
      backgroundColor: 'transparent !important',
    },

    primaryIconButton: {
      border: `1px solid ${primaryMain}`,
      backgroundColor: backgroundGeneral,
      boxShadow: defaultBoxShadow,

      '> svg': {
        color: primaryMain,
        width: '13px',
        height: '13px',
      },

      '&:hover': {
        border: `1px solid ${primaryHoverColor}`,
        backgroundColor: primaryHoverBackground,

        '> svg': {
          color: primaryHoverColor,
        },
      },

      '&:disabled': {
        border: `1px solid ${primaryDisabledColor}`,
        backgroundColor: backgroundGeneral,

        '> svg': {
          color: primaryDisabledColor,
        },
      },
    },

    dangerIconButton: {
      border: `1px solid ${redMain}`,
      backgroundColor: backgroundGeneral,
      boxShadow: defaultBoxShadow,

      '> svg': {
        color: redMain,
        width: '11px',
        height: '11px',
      },

      '&:hover': {
        border: `1px solid ${errorHoverColor}`,
        backgroundColor: errorHoverBackground,

        '> svg': {
          color: errorHoverColor,
        },
      },

      '&:disabled': {
        border: `1px solid ${errorDisabledColor}`,
        backgroundColor: backgroundGeneral,

        '> svg': {
          color: errorDisabledColor,
        },
      },
    },

    successIconButton: {
      border: `1px solid ${successMain}`,
      backgroundColor: backgroundGeneral,
      boxShadow: defaultBoxShadow,

      '> svg': {
        color: successMain,
        width: '13px',
        height: '13px',
      },

      '&:hover': {
        border: `1px solid ${successHoverColor}`,
        backgroundColor: successHoverBackground,

        '> svg': {
          color: successHoverColor,
        },
      },

      '&:disabled': {
        border: `1px solid ${successDisabledColor}`,
        backgroundColor: backgroundGeneral,

        '> svg': {
          color: successDisabledColor,
        },
      },
    },

    smallIconButton: {
      width: '24px',
      height: '24px',
    },
  }
})

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
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
    boxShadow: theme.palette.button.defaultBoxShadow,

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
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.general,

    '&:hover': {
      color: theme.palette.button.primaryHoverColor,
      backgroundColor: theme.palette.button.primaryHoverBackground,
    },

    '&:disabled': {
      color: theme.palette.button.primaryDisabledColor,
      backgroundColor: theme.palette.background.general,
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
    border: `1px solid currentColor`,
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
    border: `1px solid currentColor`,
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
    border: `1px solid ${theme.palette.dangerButton.backgroundColor}`,
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
    color: theme.palette.primary.main,
  },

  casual: {
    borderRadius: '100px',
    fontWeight: 500,
    color: theme.palette.text.general,
    backgroundColor: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.casualBoxShadow,
    border: `1px solid ${theme.palette.button.casualBorder}`,
    '&:hover': {
      boxShadow: theme.palette.boxShadow.casualBoxShadow,
      backgroundColor: `${theme.palette.boxShadow.casualHover}`,
      border: `1px solid ${theme.palette.button.casualHoverBorder}`,
    },
    '&:disabled': {
      color: theme.palette.button.casualDisabledText,
      backgroundColor: theme.palette.background.general,
      boxShadow: theme.palette.boxShadow.casualBoxShadow,
      border: `1px solid ${theme.palette.button.casualDisabledBorder}`,
    },
  },

  tableButton: {
    height: '30px',
  },

  smallButton: {
    height: '24px',
  },
}))

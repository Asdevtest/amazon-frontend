import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    minWidth: '30px !important',
    cursor: 'pointer',
    color: '#fff',
    height: 40,
    borderRadius: 7,
    fontSize: 14,
    fontWeight: 600,
  },

  defaultButton: {
    '&:disabled': {
      background: theme.palette.button.disabledBackground,
      color: theme.palette.button.disabledText,
    },
  },

  disabled: {
    cursor: 'unset !important',
  },

  success: {
    backgroundColor: '#009a07 !important',
    '&:hover': {
      backgroundColor: '#1E7422 !important',

      '@media (hover: none)': {
        backgroundColor: '#1E7422 !important',
      },
    },
    '&: disabled': {
      backgroundColor: 'rgba(15, 169, 20, 0.5) !important',
      '&:disabled': {
        background: `${theme.palette.button.disabledSuccessBackground} !important`,
        color: `${theme.palette.button.disabledSuccessText} !important`,
      },
    },
  },
  danger: {
    color: '#fff !important',
    background: '#DD2121',

    '&:hover': {
      backgroundColor: '#8C0000 !important',

      '@media (hover: none)': {
        backgroundColor: '#8C0000 !important',
      },
    },
    '&:disabled': {
      background: theme.palette.button.disabledDangerBackground,
    },
  },
  border: {
    background: 'none',
    borderRadius: 4,
    border: `1px solid ${theme.palette.primary.main}`,

    '&:hover': {
      background: 'unset !important',
    },
  },

  tooltipsWrapper: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    zIndex: '10',

    display: 'flex',
    justifyContent: 'flex-end',
  },

  tooltipsCenterWrapper: {
    position: 'absolute',
    top: 'calc(50% - 10.5px)',
    right: 15,
    zIndex: '10',

    display: 'flex',
    justifyContent: 'flex-end',
  },

  tooltip: {
    width: '18px !important',
    height: '18px !important',

    transition: '.3s ease-in-out',
    '&:hover': {
      cursor: 'default',
      transform: 'scale(1.1)',
    },
  },

  tooltipInfo: {
    marginLeft: '3px',
    color: theme.palette.primary.main,
  },

  btnWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },

  small: {
    height: '30px',
  },

  transparent: {
    padding: 0,
    color: theme.palette.text.general,
    background: 'transparent',

    '&:hover': {
      color: theme.palette.text.general,
      background: 'transparent',
    },

    '&: disabled': {
      color: theme.palette.text.general,
      background: 'transparent',
    },
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
}))

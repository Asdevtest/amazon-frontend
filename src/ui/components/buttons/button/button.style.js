import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    minHeight: '36px !important',
    minWidth: '36px !important',
  },

  success: {
    color: '#fff !important',
    backgroundColor: '#009a07 !important',
    '&:hover': {
      backgroundColor: '#4caf50 !important',

      '@media (hover: none)': {
        backgroundColor: '#4caf50 !important',
      },
    },
    '&$disabled': {
      backgroundColor: 'rgba(15, 169, 20, 0.5) !important',
    },
  },
  danger: {
    color: '#fff !important',
    backgroundColor: '#ff0000 !important',
    '&:hover': {
      backgroundColor: '#c51a1c !important',

      '@media (hover: none)': {
        backgroundColor: '#c51a1c !important',
      },
    },
    '&$disabled': {
      backgroundColor: 'rgba(210, 35, 35, 0.5) !important',
    },
  },
  disabled: {},

  tooltipsWrapper: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    zIndex: '10',
  },

  tooltipsCenterWrapper: {
    position: 'absolute',
    top: 'calc(50% - 8.5px)',
    right: '20px',
    zIndex: '10',
  },

  tooltip: {
    width: '15px',
    height: '15px',
    color: 'red',
    transition: '.3s ease-in-out',
    '&:hover': {
      cursor: 'default',
      transform: 'scale(1.1)',
    },
  },

  tooltipCenter: {},

  tooltipInfo: {
    marginLeft: '3px',
  },

  btnWrapper: {
    position: 'relative',
    display: 'inline',
  },
}))

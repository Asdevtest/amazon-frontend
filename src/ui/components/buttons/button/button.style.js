import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    maxHeight: 36,
  },

  success: {
    color: '#fff',
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#009a07',

      '@media (hover: none)': {
        backgroundColor: '#009a07',
      },
    },
    '&$disabled': {
      backgroundColor: 'rgba(15, 169, 20, 0.5)',
    },
  },
  danger: {
    color: '#fff',
    backgroundColor: 'rgb(210, 35, 35)',
    '&:hover': {
      backgroundColor: '#c51a1c',

      '@media (hover: none)': {
        backgroundColor: '#c51a1c',
      },
    },
    '&$disabled': {
      backgroundColor: 'rgba(210, 35, 35, 0.5)',
    },
  },
  disabled: {},

  tooltipsWrapper: {
    position: 'absolute',
    top: '-6px',
    right: '-6px',
    zIndex: '10',
  },

  tooltip: {
    width: '17px',
    height: '17px',
    color: 'red',
    transition: '.3s ease-in-out',
    '&:hover': {
      cursor: 'default',
      transform: 'scale(1.1)',
    },
  },

  tooltipInfo: {
    marginLeft: '3px',
  },

  btnWrapper: {
    position: 'relative',
    display: 'inline-flex',
  },
}))

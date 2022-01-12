import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    position: 'relative',
  },

  success: {
    color: '#fff',
    backgroundColor: 'rgb(15, 169, 20)',
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

  tooltip: {
    width: '25px',
    height: '25px',
    position: 'absolute',
    color: 'red',
    top: '-10px',
    right: '-10px',
    transition: '.3s ease-in-out',
    '&:hover': {
      cursor: 'default',
      transform: 'scale(1.1)',
    },
  },
}))

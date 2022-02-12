import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  mainWrapper: {
    gap: '5px',
    width: '100%',
    flexDirection: 'column',
    height: '80vh',
  },

  row: {
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
}))

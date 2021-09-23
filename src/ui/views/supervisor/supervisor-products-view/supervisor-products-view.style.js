import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  tableWrapper: {
    marginTop: '32px',
    minWidth: '100%',
    height: '100%',
  },

  row: {
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
}))

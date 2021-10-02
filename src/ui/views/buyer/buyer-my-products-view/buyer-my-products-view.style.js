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

  attentionRow: {
    boxShadow: 'inset 0 0 30px rgba(247, 179, 7,1)',
    // boxShadow: 'inset 0 0 30px rgba(247, 131, 64,1)'
    // boxShadow: 'inset 0 0 30px rgba(247, 240, 15,1)'
  },
}))

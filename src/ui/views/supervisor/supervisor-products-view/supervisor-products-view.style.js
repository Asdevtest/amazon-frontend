import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  tableWrapper: {
    marginTop: '32px',
    minWidth: '100%',
    height: '100%',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg), auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  attentionRow: {
    boxShadow: 'inset 0 0 15px rgba(247, 179, 7, .8)',
  },
}))

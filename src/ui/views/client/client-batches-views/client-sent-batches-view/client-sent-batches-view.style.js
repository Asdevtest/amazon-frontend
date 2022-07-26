import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  card: {
    padding: '16px 20px',
    marginBottom: '42px',
  },
  button: {
    marginRight: '24px',
  },
  buttonsWrapper: {
    textAlign: 'right',
  },
  tableWrapper: {
    marginTop: '24px',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg), auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
}))

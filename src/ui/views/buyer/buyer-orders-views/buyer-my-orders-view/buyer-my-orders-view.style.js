import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  buttonWrapper: {
    padding: '16px',
    textAlign: 'right',
    marginRight: '0px',
    borderTop: '1px solid rgb(224,224,224)',
  },
  tableWrapper: {
    marginTop: '32px',
    minWidth: '100%',
    height: '100%',
  },
  dialogContextClassName: {
    width: '1200px',
  },
  modalMessageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },

  row: {
    cursor: 'url(/assets/icons/Cursor.svg), auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  attentionRow: {
    boxShadow: 'inset 0 0 30px rgba(247, 179, 7,1)',
  },
}))

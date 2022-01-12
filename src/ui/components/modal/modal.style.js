import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  dialogPadding: {
    padding: '20px 24px',
  },

  warningDialogPadding: {
    padding: '0',
    '&:first-child': {
      padding: '0',
    },
  },

  warningPaper: {
    borderRadius: '10px',
    backgroundColor: 'red',
  },

  dialogContent: {
    position: 'relative',
    overflow: 'visible',
    borderRadius: '15px',
  },

  closeIcon: {
    color: 'rgba(255,255,255, .9)',
    position: 'absolute',
    top: '-30px',
    right: '-30px',
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
}))

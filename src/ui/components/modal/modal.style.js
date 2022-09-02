import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  dialogPadding: {
    padding: '40px 30px',
  },

  warningDialogPadding: {
    padding: '40px 30px',
    '&:first-child': {
      padding: '0',
    },
  },

  warningPaper: {
    borderRadius: '10px',
  },

  dialogContent: {
    position: 'relative',
    overflow: 'visible',
    borderRadius: '4px',
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
  '@media (max-width: 768px)': {
    dialogPadding: {
      padding: '30px 20px',
    },
    closeIcon: {
      visibility: 'hidden',
    },
  },
}))

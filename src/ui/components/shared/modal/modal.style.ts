import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  dialogPadding: {
    padding: '30px',
    height: '100%',
  },

  warningDialogPadding: {
    padding: '30px',
    '&:first-of-type': {
      padding: '0',
    },
  },

  warningPaper: {
    borderRadius: '10px',
  },

  dialogContent: {
    position: 'relative',
    overflow: 'visible',
    borderRadius: '7px',
  },

  closeIcon: {
    color: 'rgba(255,255,255, .9)',
    position: 'absolute',
    top: '-30px',
    right: '-30px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  '@media (max-width: 768px)': {
    dialogPadding: {
      padding: '30px 10px',
    },
    closeIcon: {
      zIndex: 999,
      color: '#006CFF',
      position: 'absolute',
      top: '10px',
      right: '10px',
      transition: '0.3s ease',
      cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
      '&:hover': {
        transform: 'scale(1.2)',
      },
    },
  },
}))

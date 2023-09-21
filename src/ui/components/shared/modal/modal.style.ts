import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  dialogPadding: {
    padding: '30px',
    height: '100%',
    width: '100%',

    [theme.breakpoints.down(768)]: {
      padding: 20,
    },
  },

  warningDialogPadding: {
    padding: '30px',
    '&:first-of-type': {
      padding: '0',
    },

    [theme.breakpoints.down(768)]: {
      padding: 20,
    },
  },

  warningPaper: {
    borderRadius: '10px',
  },

  dialogContent: {
    position: 'relative',
    overflow: 'visible',
    borderRadius: '7px',

    [theme.breakpoints.down(768)]: {
      margin: 0,
      maxWidth: '100%',
      height: '100%',
      width: '100%',
      borderRadius: 0,
    },
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

    [theme.breakpoints.down(768)]: {
      zIndex: 30,
      color: theme.palette.primary.main,
      top: '10px',
      right: '10px',
    },
  },

  noPadding: {
    padding: 0,
  },
}))

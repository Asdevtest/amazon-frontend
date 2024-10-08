import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  dialogWrapper: {
    width: '100% !important',
    height: '100% !important',
    maxHeight: '100% !important', // because of external styles
    maxWidth: '100% !important', // because of external styles
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.6)',
    opacity: 0,
    transition: 'opacity 0.3s',
  },

  openModal: {
    opacity: 1,
  },

  contentWrapper: {
    position: 'relative',
    padding: 20, // 20 - for test, before was 30
    background: theme.palette.background.general,
    borderRadius: 20,

    [theme.breakpoints.down(768)]: {
      padding: 20,
      height: '100%',
      width: '100%',
      borderRadius: 0,
    },
  },

  alternativeBackground: {
    background: theme.palette.background.second,
  },

  content: {
    maxWidth: '90vw',
    maxHeight: '85vh',
    overflowY: 'auto',
    overflowX: 'hidden',

    [theme.breakpoints.down(768)]: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
  },

  closeIcon: {
    position: 'absolute',
    top: -25,
    right: -25,
    color: 'rgba(255,255,255, .9)',
    transition: '0.3s ease',
    cursor: 'pointer',

    '&:hover': {
      transform: 'scale(1.1)',
    },

    [theme.breakpoints.down(768)]: {
      zIndex: 7,
      top: 10,
      right: 10,
      color: theme.palette.primary.main,
    },
  },
}))

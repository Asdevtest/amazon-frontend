import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  controlsOverlay: {
    pointerEvents: 'none',
    display: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    // background: 'rgba(0,0,0, .1)',
    borderRadius: '20px',
    margin: '0 42px',
    justifyContent: 'flex-end',

    [theme.breakpoints.down(768)]: {
      margin: 0,
      borderRadius: 15,
    },
  },

  showOverlay: {
    display: 'flex',
  },

  controls: {
    backgroundColor: theme.palette.background.general,
    display: 'flex',
    gap: '16px',
    padding: '6px 16px',
    height: 'fit-content',
    pointerEvents: 'all',
    borderRadius: '8px',
    zIndex: 7,

    button: {
      all: 'unset',
      cursor: 'pointer',
      color: theme.palette.text.second,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },

    svg: {
      width: 18,
    },
  },
}))

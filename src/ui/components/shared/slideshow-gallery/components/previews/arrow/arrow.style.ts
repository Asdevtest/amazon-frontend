import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  arrowButton: {
    height: 18,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrowButtonModalSize: {
    height: 42,
    padding: 5,
  },

  arrowIcon: {
    width: '18px !important',
    height: '18px !important',
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',

    path: {
      stroke: theme.palette.primary.main,
    },

    '&:hover': {
      opacity: 0.8,
    },
  },

  arrowDisable: {
    cursor: 'auto',
    opacity: 0.5,

    '&:hover': {
      opacity: 0.5,
    },
  },

  arrowModalSize: {
    width: '32px !important',
    height: '32px !important',
  },
}))

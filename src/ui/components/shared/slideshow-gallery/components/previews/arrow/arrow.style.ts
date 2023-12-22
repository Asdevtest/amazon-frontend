import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  arrowButton: {
    height: 18,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrowIcon: {
    width: '18px !important',
    height: '18px !important',
    color: theme.palette.background.general,
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',

    '&:hover': {
      opacity: 0.6,
    },
  },

  arrowIconDisable: {
    cursor: 'auto',
    opacity: 0.5,
    transition: 'opacity 0.3s ease-in-out',

    '&:hover': {
      opacity: 0.5,
    },
  },
}))

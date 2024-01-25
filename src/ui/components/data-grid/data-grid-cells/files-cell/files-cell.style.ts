import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  visibilityButton: {
    width: 56,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.general,
    borderRadius: 16,
    boxShadow: '0 0 5px 3px rgba(0, 0, 0, 0.17)',
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  visibilityIcon: {
    width: '20px !important',
    height: '20px !important',
    color: theme.palette.primary.main,
  },
}))

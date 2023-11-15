import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  toast: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,

    '.Toastify__toast': {
      position: 'relative',
      margin: 0,
      borderRadius: 20,
      boxShadow: theme.palette.boxShadow.paper,
      background: theme.palette.background.general,
      gap: 20,
      cursor: 'pointer',
    },

    '.Toastify__toast-body': {
      padding: 0,
    },
  },

  closeIcon: {
    color: '#C4C4C4',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}))

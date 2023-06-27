import { makeStyles } from 'tss-react/mui'

export const useToastStyles = makeStyles()(theme => ({
  toast: {
    width: 'fit-content',

    '.Toastify__toast': {
      borderRadius: 20,
      backgroundColor: theme.palette.background.general,
      padding: '15px 20px',
      display: 'flex',
      boxShadow: '0px 2px 40px 2px rgba(0, 0, 0, 0.4)',
    },

    '.Toastify__toast-theme--dark': {
      backgroundColor: `${theme.palette.background.general} !important`,
    },
  },

  closeIcon: {
    color: '#C4C4C4',
    cursor: 'pointer',
    transition: '.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}))

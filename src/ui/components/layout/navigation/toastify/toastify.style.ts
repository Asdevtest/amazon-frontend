import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  toastContainer: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,

    '.Toastify__toast': {
      alignItems: 'flex-start',
      margin: 0,
      borderRadius: 20,
      boxShadow: theme.palette.boxShadow.paper,
      gap: 20,
      cursor: 'pointer',
    },

    '.Toastify__toast-body': {
      padding: 0,
    },
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    minWidth: '400px',
  },

  button: {
    marginLeft: '10px',
    color: theme.palette.text.primary,
  },

  standartText: {
    color: theme.palette.text.primary,
  },

  form: {
    marginTop: '20px',
  },

  label: {
    margin: 0,
  },

  footerWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

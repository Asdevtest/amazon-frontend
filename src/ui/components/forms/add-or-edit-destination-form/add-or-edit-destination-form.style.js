import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    minWidth: '400px',
  },

  button: {
    marginLeft: '10px',
    color: theme.palette.text.general,
  },

  standartText: {
    color: theme.palette.text.general,
  },

  form: {
    marginTop: '20px',
  },

  label: {
    margin: 0,
  },

  btnsWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

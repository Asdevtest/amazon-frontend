import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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

  btnsWrapper: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

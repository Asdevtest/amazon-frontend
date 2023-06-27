import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    minWidth: 100,
  },

  button: {
    marginLeft: 10,
    color: theme.palette.text.general,
  },

  standartText: {
    color: theme.palette.text.general,
  },

  form: {
    marginTop: 20,
  },

  btnsWrapper: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

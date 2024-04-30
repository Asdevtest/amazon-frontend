import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    minWidth: 100,
  },

  button: {
    marginLeft: 10,
  },

  standartText: {},

  form: {
    marginTop: 20,
  },

  label: {
    margin: 0,
  },

  btnsWrapper: {
    marginTop: 30,
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  inputsWrapper: {
    display: 'flex',
  },

  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  inputLabel: {
    color: theme.palette.text.general,
  },

  inputField: {
    margin: '0 !important',
    padding: '0 !important',
  },

  input: {
    display: 'flex',
    width: 50,
    border: 'none',
    margin: '0 !important',
    padding: '0 !important',

    '& > input': {
      textAlign: 'center',
    },

    '&:after': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      margin: 'auto',
      content: '" "',
      display: 'block',
      height: 1,
      width: 30,
      background: theme.palette.text.second,
    },
  },
}))

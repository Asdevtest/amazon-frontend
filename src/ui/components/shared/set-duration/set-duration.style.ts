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
    height: 24,
    display: 'flex',
    width: 40,
    border: 'none',
    margin: '0 !important',
    padding: '0 !important',

    '& > input': {
      textAlign: 'center',
      padding: 0,
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

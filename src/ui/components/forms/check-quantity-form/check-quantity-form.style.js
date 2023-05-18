import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: 485,

    display: 'flex',
    flexDirection: 'column',

    gap: 40,
    alignItems: 'center',
  },

  modalText: {
    color: theme.palette.text.general,
    fontWeight: 600,
    fontSize: 18,
  },

  normalText: {
    color: theme.palette.text.general,
    fontSize: 18,
    width: 367,
    textAlign: 'center',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: 40,
  },

  closeButton: {
    color: theme.palette.text.general,
  },

  input: {
    width: 190,
    height: 40,
    justifySelf: 'center',
    textAlign: 'center',
  },

  inputContainer: {
    width: 'min-content',
  },

  button: {
    width: 100,
  },
}))

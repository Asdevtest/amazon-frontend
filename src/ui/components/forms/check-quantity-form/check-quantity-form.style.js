import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 480,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 5,
  },

  textRed: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.red,
  },

  input: {
    width: 190,
    height: 40,
  },

  inputContainer: {
    width: 'min-content',
    margin: 0,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 40,
  },
}))

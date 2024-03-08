import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  flexlContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  checkbox: {
    padding: 2,
  },

  text: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  buttons: {
    height: 30,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  button: {
    padding: '0 10px',
    height: 30,
  },

  icon: {
    width: '16px !important',
    height: '16px !important',
  },
}))

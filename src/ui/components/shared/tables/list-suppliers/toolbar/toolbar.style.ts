import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  toolbar: {
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  tableTitle: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 600,
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  button: {
    height: 32,
    width: 32,
  },

  icon: {
    width: '20px !important',
    height: '20px !important',
  },

  buttonWithText: {
    height: 32,
  },
}))

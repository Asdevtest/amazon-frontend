import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  title: {
    fontSize: 16,
    fontWeight: 600,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '800px',
  },

  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },

  buttons: {
    display: 'flex',
    gap: 10,
  },
}))

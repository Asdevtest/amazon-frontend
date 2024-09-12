import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
  },
}))

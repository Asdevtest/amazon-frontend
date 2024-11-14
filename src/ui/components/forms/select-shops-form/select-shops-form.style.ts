import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '20px',
  },

  title: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  buttons: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },
}))

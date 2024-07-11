import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: 570,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '25px',
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 20,
  },
}))

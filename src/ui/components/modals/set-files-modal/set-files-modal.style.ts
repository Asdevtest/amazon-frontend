import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: 10,
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
  },

  buttons: {
    display: 'flex',
    gap: 20,
    justifyContent: 'space-between',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  button: {
    height: 30,
    width: 140,
  },
}))

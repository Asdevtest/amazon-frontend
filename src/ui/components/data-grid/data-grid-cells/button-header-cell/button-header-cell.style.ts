import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: '98%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  button: {
    height: 30,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
}))

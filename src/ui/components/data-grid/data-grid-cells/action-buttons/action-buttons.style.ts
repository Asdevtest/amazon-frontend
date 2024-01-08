import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    width: '100%',
    height: 30,
  },
  repeatButton: {
    marginBottom: 5,
  },
}))

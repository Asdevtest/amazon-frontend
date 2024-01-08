import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  fullWidthButton: {
    width: '100%',
  },
  button: {
    height: 30,
  },
  repeatButton: {
    marginBottom: 5,
  },
}))

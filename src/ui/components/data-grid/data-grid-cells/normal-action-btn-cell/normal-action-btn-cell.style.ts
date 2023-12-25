import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    width: '100%',
    height: '100%',
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },

  button: {
    height: 30,
    width: 'auto',
    maxWidth: '100%',
  },

  fullWidthButton: {
    width: '100%',
  },
}))

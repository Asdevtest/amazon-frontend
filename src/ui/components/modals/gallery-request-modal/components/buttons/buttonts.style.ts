import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'flex-end',
  },

  button: {
    padding: '0 20px',
    display: 'flex',
    gap: 10,
    borderRadius: 40,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 30,
  },

  button: {
    borderRadius: '20px',
  },
}))

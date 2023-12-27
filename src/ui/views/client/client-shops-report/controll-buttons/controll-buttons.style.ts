import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  buttonsWrapper: {
    display: 'flex',
    gap: 20,
  },
}))

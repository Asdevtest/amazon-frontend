import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tableWrapper: {
    height: '77vh',
    width: '100%',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
}))

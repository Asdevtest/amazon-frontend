import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
  },

  center: {
    justifyContent: 'center',
  },
}))

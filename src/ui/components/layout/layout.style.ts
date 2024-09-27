import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    minHeight: '100vh',
  },

  content: {
    flex: 1,
    padding: 10,
    overflow: 'auto',
  },
}))

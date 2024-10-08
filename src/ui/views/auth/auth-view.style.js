import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    flex: 1,
  },

  error: {
    color: theme.palette.text.second,
  },
}))

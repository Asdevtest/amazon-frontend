import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    color: theme.palette.text.general,
    padding: '5px',
    width: '100%',
    border: 'none !important',
  },

  error: {
    color: theme.palette.text.red,
  },
}))

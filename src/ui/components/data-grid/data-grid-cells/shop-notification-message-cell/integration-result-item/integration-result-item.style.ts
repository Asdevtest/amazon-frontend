import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  title: {
    fontWeight: 600,
  },

  success: {
    color: theme.palette.text.green,
  },

  error: {
    color: theme.palette.text.red,
  },

  list: {
    listStyleType: 'none',
  },

  listItemText: {
    display: 'flex',
  },
}))

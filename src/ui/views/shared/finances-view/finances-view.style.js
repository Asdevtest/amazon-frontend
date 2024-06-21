import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  redRow: {
    color: theme.palette.text.red,
  },

  greenRow: {
    color: theme.palette.text.green,
  },

  tableWrapper: {
    height: '88vh',
    width: '100%',
  },
}))

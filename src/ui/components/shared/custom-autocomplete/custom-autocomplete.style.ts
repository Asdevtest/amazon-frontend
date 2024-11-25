import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
  },

  cell: {
    padding: '5px 0',
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  fullWidth: {
    width: '100%',
  },

  label: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 225,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  cell: {
    padding: '10px 0',
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  label: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },
}))

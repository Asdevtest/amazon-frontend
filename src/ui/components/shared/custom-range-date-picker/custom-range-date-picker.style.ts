import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
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

  datePicker: {
    width: 240,
  },

  label: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },
}))

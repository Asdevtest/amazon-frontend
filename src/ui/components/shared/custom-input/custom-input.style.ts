import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 400,
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

  input: {
    width: '100%',
  },

  label: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },
}))

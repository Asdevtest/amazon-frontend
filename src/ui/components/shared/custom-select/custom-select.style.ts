import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  cell: {
    padding: '5px 0',
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  select: {
    // width: '225px',
  },

  label: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },
}))

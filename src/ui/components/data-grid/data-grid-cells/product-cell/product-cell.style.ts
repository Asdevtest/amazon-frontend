import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    minWidth: '150px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    position: 'relative',
  },

  cell: {
    padding: '5px 0px',
  },

  text: {
    width: 'max-content',
    fontSize: '12px',
    lineHeight: '16px',
  },

  fixWidth: {
    width: '85%',
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  flexColumn: {
    width: '100%',
    minWidth: '80px',
    display: 'flex',
    flexDirection: 'column',
  },

  superbox: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },

  warning: {
    position: 'absolute',
    bottom: '5px',
    right: 0,
  },

  warningText: {
    color: theme.palette.text.red,
  },

  mask: {
    padding: '0 5px',
    display: 'flex',
    gap: '10px',
  },
}))

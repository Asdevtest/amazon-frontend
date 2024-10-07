import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    minWidth: '150px',
    width: '100%',
    padding: '5px 0px',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    position: 'relative',
  },

  text: {
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

  image: {
    minWidth: '32px',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: theme.palette.boxShadow.paper,
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

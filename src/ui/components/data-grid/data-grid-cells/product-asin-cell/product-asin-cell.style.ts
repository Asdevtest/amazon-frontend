import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    minWidth: '150px',
    width: '100%',
    padding: '5px 0px',
    display: 'flex',
    flexDirection: 'column',
  },

  text: {
    fontSize: '12px',
    lineHeight: '16px',
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },

  image: {
    minWidth: '32px',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: theme.palette.boxShadow.paper,
  },
}))

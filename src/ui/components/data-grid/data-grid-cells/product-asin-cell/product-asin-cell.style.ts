import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '200px',
    padding: '10px 0px',
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },

  flexRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '5px',
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },

  image: {
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: theme.palette.boxShadow.paper,
  },
}))

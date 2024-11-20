import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    height: '100%',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '5px',
    borderRadius: '16px',
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
  },

  flexRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  flexColumn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '5px',
  },

  divider: {
    height: '49px',
  },
}))

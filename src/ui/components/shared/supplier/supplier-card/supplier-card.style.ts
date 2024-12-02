import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    padding: '20px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '20px',
    borderRadius: '16px',
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
  },

  fixHeight: {
    height: '220px',
  },

  infoBlock: {
    height: '100%',
    alignItems: 'flex-start',
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  flexColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  viewMore: {
    marginTop: 'auto',
  },

  payments: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  imagesBlock: {
    height: '100%',
    width: '260px',
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'flex-end',
  },
}))

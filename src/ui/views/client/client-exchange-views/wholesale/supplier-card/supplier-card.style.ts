import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    height: '205px',
    padding: '20px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '20px',
    borderRadius: '16px',
    boxShadow: theme.palette.boxShadow.paper,
  },

  infoBlock: {
    height: '100%',
    justifyContent: 'space-between',
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

  payments: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  imagesBlock: {
    width: '260px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
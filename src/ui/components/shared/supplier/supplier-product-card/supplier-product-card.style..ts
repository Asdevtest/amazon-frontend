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

  imagesWrapper: {
    minWidth: '240px',
  },

  flexRow: {
    display: 'flex',
    alignItems: 'center',
  },

  flexColumn: {
    width: '70px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  fullWidth: {
    width: '100%',
    height: '100%',
  },

  divider: {
    height: '49px',
  },

  extraGap: {
    gap: '5px',
  },

  gorizontal: {
    flexDirection: 'row',
    gap: '20px',
  },

  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

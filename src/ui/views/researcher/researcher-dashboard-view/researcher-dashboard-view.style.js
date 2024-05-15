import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  userInfoWrapper: {
    marginBottom: 40,
    padding: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,
    borderRadius: 8,
  },

  cardImg: {
    width: '145px',
    height: '145px',
    borderRadius: '50%',
    boxShadow: theme.palette.boxShadow.paper,
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
}))

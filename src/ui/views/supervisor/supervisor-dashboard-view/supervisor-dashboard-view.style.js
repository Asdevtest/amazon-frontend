import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  userInfoWrapper: {
    padding: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '25px',
    boxShadow: theme.palette.boxShadow.paper,
  },

  cardImg: {
    width: '145px',
    height: '145px',
    borderRadius: '50%',
  },

  userInfoLeftWrapper: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
  },

  masterUserWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  userInfoWrapper: {
    marginBottom: theme.spacing(5),
    padding: '40px 50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0px 2px 8px 2px rgba(0, 0, 0, 0.05)',
  },

  userInfoLeftWrapper: {
    display: 'flex',
    gap: '25px',
  },

  cardImg: {
    width: '145px',
    height: '145px',
    borderRadius: '50%',
  },

  buttonWrapper: {
    display: 'flex',
    gap: '20px',
  },

  button: {
    height: '40px',
    width: '156px',
    display: 'flex',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
  },

  balanceWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '145px',
    minWidth: 700,
  },

  icon: {
    width: '16px !important',
    height: '16px !important',
  },

  withdrawBtn: {
    color: `${theme.palette.text.primary} !important`,
  },

  masterUserWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
}))

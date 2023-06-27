export const styles = theme => ({
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
  },

  buttonWrapper: {
    display: 'flex',
    gap: '20px',
  },

  button: {
    height: '40px',
    width: '156px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  balanceWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '145px',
    minWidth: 700,
  },

  icon: {
    width: 11,
    height: 11,
  },

  withdrawBtn: {
    color: `${theme.palette.text.general} !important`,
  },

  masterUserWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
})

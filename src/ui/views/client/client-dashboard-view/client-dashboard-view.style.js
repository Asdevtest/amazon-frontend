export const styles = theme => ({
  balanceTitle: {
    color: theme.palette.text.general,
    fontSize: '72px',
    fontWeight: 400,
    lineHeight: '84px',
  },
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
  mr2: {
    marginRight: theme.spacing(2),
  },
  buttonWrapper: {
    display: 'flex',
    gap: '20px',
  },

  button: {
    height: '40px',
    width: '172px',
    // Height: '40px !important'
  },

  balanceWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '145px',
  },

  icon: {
    marginLeft: '20px',
    justifySelf: 'flex-end',
    width: 11,
    height: 11,
  },

  withdrawBtn: {
    // marginLeft: 50,
    color: `${theme.palette.text.general} !important`,
  },
})

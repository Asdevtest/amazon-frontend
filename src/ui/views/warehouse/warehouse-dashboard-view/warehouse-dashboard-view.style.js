export const styles = theme => ({
  userInfoWrapper: {
    marginBottom: theme.spacing(5),

    padding: '40px 50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '25px',
    boxShadow: '0px 2px 8px 2px rgba(0, 0, 0, 0.05)',
    [theme.breakpoints.down(768)]: {
      padding: '20px 20px',
      display: 'flex',
      alignItems: 'start',
      flexDirection: 'column',
      gap: '39px',
      boxShadow: '0px 2px 8px 2px rgba(0, 0, 0, 0.05)',
    },
  },
  cardImg: {
    width: '145px',
    height: '145px',
    [theme.breakpoints.down(768)]: {
      width: '51px',
      height: '51px',
    },
  },
  userInfoLeftWrapper: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
  },

  addressMainWrapper: {
    marginTop: 20,
  },

  addressSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  editBtn: {
    [theme.breakpoints.down(768)]: {
      width: '100%',
      marginTop: 10,
    },
  },

  addressMain: {
    color: theme.palette.text.general,
  },

  address: {
    color: theme.palette.text.second,
  },

  masterUserWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
})

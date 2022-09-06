import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  balanceTitle: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '72px',
    fontWeight: 400,
    lineHeight: '84px',
  },
  userInfoWrapper: {
    marginBottom: theme.spacing(5),

    padding: '40px 50px',
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
    boxShadow: '0px 2px 8px 2px rgba(0, 0, 0, 0.05)',
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
    gap: '10px',
  },

  button: {
    padding: '0 40px',
    // Height: '40px !important'
  },

  balanceWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '145px',
  },

  // withdrawBtn: {
  //   marginLeft: 50,
  // },
}))

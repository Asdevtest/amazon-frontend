import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles(theme => ({
  appbar: {
    width: '100%',
    height: theme.spacing(7),
    boxShadow: `0px 5px 19px 0px rgba(90, 97, 105, 0.12)`,
    backgroundColor: '#fff',
    borderRadius: '0',
    zIndex: 1100,
    flexShrink: 0,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(1.5),
    },
  },
  title: {
    flexGrow: 1,
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
  avatar: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  username: {
    fontSize: '14px',
    fontWeight: 500,
  },
  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    height: '100%',
  },
  usernameAndBalanceWrapper: {
    marginRight: '8px',
    textAlign: 'right',
  },
  balance: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
  },
  notificationWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  notificationList: {
    width: '420px',
    [theme.breakpoints.down('xs')]: {
      width: '320px',
    },
  },
  menuItemText: {
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '18px',
    color: 'rgba(90, 97, 105, 1)',
  },

  footer: {
    bottom: 0,
  },
  menuWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '200px',
  },
  menuTitle: {
    height: '30px',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '18px',
    color: 'rgba(90, 97, 105, 1)',
    textAlign: 'center',
  },
}))

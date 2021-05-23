import {makeStyles} from '@material-ui/core'

export const useClassNames = props =>
  makeStyles(theme => ({
    appbar: {
      width: `calc(100% - ${props.drawerWidth}px)`,
      height: theme.spacing(7), // 56px
      marginLeft: `${props.drawerWidth}px`,
      boxShadow: `0px 5px 19px 0px rgba(90, 97, 105, 0.12)`,
      backgroundColor: '#fff',
      position: 'fixed',
      borderRadius: '0',
      zIndex: 2,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: '0px',
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(5), // 40px
      paddingRight: theme.spacing(5),
      height: '100%',
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(1.5), // 12px
      },
    },
    title: {
      flexGrow: 1,
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: '15px',
      color: 'rgba(115, 129, 143, 1)',
    },
    avatar: {
      marginLeft: theme.spacing(3), // 24px
      marginRight: theme.spacing(3),
    },
    username: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '18px',
      color: 'rgba(90, 97, 105, 1)',
    },
    userInfoWrapper: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      height: '100%',
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
    colorIcons: {
      color: 'rgba(217, 222, 229, 1)',
    },
    growWrapper: {
      transformOrigin: 'center top',
    },
    card: {
      borderRadius: '0 0 4px 4px',
    },
    notificationSpan: {
      color: 'rgb(15, 169, 20)',
    },
    viewAllNotification: {
      textAlign: 'center',
      width: '100%',
      fontWeight: 500,
    },
    userInfoContainer: {
      height: '100%',
      minWidth: '150px',
    },
    cardContainer: {
      transformOrigin: 'center top',
    },
    cardMenuList: {
      width: '190px',
    },
    comissons: {
      bottom: '0',
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }))

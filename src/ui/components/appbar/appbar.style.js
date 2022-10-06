import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles(theme => ({
  mainWrapper: {
    width: '100%',
    backgroundColor: theme.palette.background.second,
  },

  appbar: {
    width: '100%',
    height: theme.spacing(7),
    boxShadow: `0px 5px 19px 0px rgba(90, 97, 105, 0.12)`,
    // backgroundColor: '#fff',

    backgroundColor: theme.palette.background.main,
    borderRadius: '0',
    zIndex: 1100,
    flexShrink: 0,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: theme.spacing(5),
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(1.5),
    },
  },

  title: {
    fontWeight: 600,
    color: theme.palette.text.second,
    fontSize: '16px',
  },

  titleWrapper: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },

  hintsIcon: {
    width: 18,
    height: 18,
    marginLeft: 20,
    transition: '.2s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  avatar: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  username: {
    color: theme.palette.text.second,

    fontSize: '14px',
    fontWeight: 500,
    width: '110px',
    textOverflow: 'ellipsis',
  },
  userroleTitle: {
    color: theme.palette.text.second,

    marginRight: '5px',
  },
  userrole: {
    marginRight: '20px',
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '16px',
    padding: '6px 16px',
    fontWeight: 500,
    borderRadius: '4px',
  },
  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    height: '100%',
    '&:hover': {
      backgroundColor: '#CCE2FF',
    },
  },
  usernameAndBalanceWrapper: {
    marginRight: '8px',
    textAlign: 'right',
  },
  balance: {
    color: theme.palette.text.second,

    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
  },
  notificationWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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

  menu: {
    width: '170px',
    marginTop: '40px',
    marginLeft: '85px',
    display: 'flex',
  },

  menuWrapper: {
    display: 'flex',
    justifyContent: 'start',
    width: '170px',
    padding: '13px 0 13px 33px',
    fontSize: 18,
    lineHeight: '140%',
    fontWeight: 400,
    color: '#001029',
    backgroundColor: '#fff',

    '&:hover': {
      backgroundColor: '#CCE2FF',
    },
  },

  list: {
    padding: 0,
  },

  icon: {
    marginRight: '13px',
  },
  menuTitle: {
    height: '30px',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '18px',
    color: 'rgba(90, 97, 105, 1)',
    textAlign: 'center',
  },

  roleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '5px',
  },

  roleSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  roleSelect: {
    width: '150px',
  },

  menuBtn: {
    width: '80px',
    height: '30px',
  },

  allowedRolesWrapper: {
    display: 'flex',
    marginRight: '30px',
  },

  allowedRolesMainWrapper: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '200px',
  },

  allowedRolesItem: {
    marginLeft: '10px',
    color: theme.palette.text.general,

    // color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '16px',
    transition: '.15s ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
      transform: 'scale(1.01)',
    },
  },

  сurrentAllowedRolesItem: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',

    borderBottom: '5px solid #0460DE',
    color: theme.palette.primary.main,
  },

  selectorsWrapper: {
    width: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  breadCrumbsWrapper: {
    // position: 'absolute',
    width: '100%',
    display: 'flex',
    paddingLeft: 30,
    alignItems: 'center',
    margin: '10px 0 5px 0',
    height: 'min-content',
  },

  tooltipWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },

  hintsTextActive: {
    fontSize: 18,
    lineHeight: '140%',
    fontWeight: 400,
    color: theme.palette.primary.main,
  },
  hintsTextNoActive: {
    fontSize: 18,
    lineHeight: '140%',
    fontWeight: 400,
    color: '#c4c4c4',
  },
  hideOnModile: {
    display: 'block',
  },

  menuIcon: {
    color: '#006CFF',
  },

  themeIcon: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  menuClientInfoWrapper: {display: 'none'},
  menuClientInfo: {display: 'none'},
  menuClientInfoText: {display: 'none'},
  mobileAllowedRolesMainWrapper: {},
  mobileAllowedRolesWrapper: {display: 'none'},
  mobileUserroleTitle: {display: 'none'},
  menuClientRoleWrapper: {display: 'none'},
  mobileAllowedRolesItem: {display: 'none'},
  indicator: {},
  userRoleWrapper: {},

  '@media (max-width: 768px)': {
    hintsTextActive: {
      display: 'none',
    },
    hintsTextNoActive: {
      display: 'none',
    },
    userroleTitle: {
      display: 'none',
    },
    allowedRolesMainWrapper: {
      display: 'none',
    },
    hideOnModile: {
      display: 'none',
    },
    usernameAndBalanceWrapper: {
      display: 'none',
    },
    hintsIcon: {
      marginLeft: 10,
    },

    avatar: {
      marginLeft: 0,
      marginRight: 0,
      width: '32px',
      height: '32px',
    },
    menu: {
      width: '161px',
      marginTop: -16,
      marginLeft: '15px',
      display: 'flex',
      // height: '150vh !important',
    },

    breadCrumbsWrapper: {
      paddingLeft: 10,
    },
    menuClientInfoWrapper: {
      display: 'flex',
      justifyContent: 'start',
      marginTop: '2px',
      gap: 15,
    },
    menuClientInfo: {
      display: 'flex',
      flexDirection: 'column',
    },

    menuClientInfoText: {
      display: 'block',
      fontSize: '14px',
      lineHeight: '19px',
      color: '#656565',
      textAlign: 'end',
    },
    mobileAllowedRolesMainWrapper: {
      // display: 'flex',
      // flexDirection: 'column',
    },
    mobileAllowedRolesWrapper: {
      width: '161px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      marginBottom: '20px',
    },
    mobileUserroleTitle: {
      display: 'block',
      fontSize: '14px',
      lineHeight: '19px',
      color: '#656565',
      marginTop: '20px',
      marginBottom: '20px',
      textTransform: 'capitalize',
    },
    menuClientRoleWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
    },
    userrole: {
      marginRight: 0,
      color: theme.palette.text.general,

      // color: '#656565',
      fontSize: '14px',
      lineHeight: '19px',
      padding: 0,
      fontWeight: 600,
      borderRadius: 0,
      marginBottom: 10,
    },
    сurrentAllowedRolesItem: {
      background: '#fff',

      borderBottom: 0,
      color: '#006CFF',
    },
    menuWrapper: {
      display: 'flex',

      justifyContent: 'start',
      width: '161px',
      padding: '13px 0 13px 10px',
      fontSize: 16,
      lineHeight: '22px',
      fontWeight: 400,
      color: '#001029',
      backgroundColor: '#fff',

      '&:hover': {
        backgroundColor: '#CCE2FF',
      },
    },
    allowedRolesWrapper: {
      flexDirection: 'column',
      marginRight: '30px',
    },
    allowedRolesItem: {
      color: theme.palette.text.general,

      // color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '16px',
      transition: '.15s ease-in-out',
      '&:hover': {
        color: '#0460DE',
        transform: 'scale(1.01)',
      },
    },
    indicator: {
      display: 'block',
      width: '2px',
      height: '16px',
      backgroundColor: '#006CFF',
    },
    userRoleWrapper: {
      display: 'flex',
      gap: 5,
    },
  },

  e: {},
}))

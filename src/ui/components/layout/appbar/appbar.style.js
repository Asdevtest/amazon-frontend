import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
    backgroundColor: theme.palette.background.second,
  },

  appbar: {
    width: '100%',
    height: theme.spacing(7),
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
    borderRadius: '0',
    zIndex: 1100,
    flexShrink: 0,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 25,
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
    [theme.breakpoints.down(768)]: {
      marginLeft: 10,
    },
  },

  hintsIconActive: {
    color: theme.palette.primary.main,
  },

  avatar: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.down(768)]: {
      marginLeft: 0,
      marginRight: 0,
      width: '32px',
      height: '32px',
    },
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
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  userrole: {
    marginRight: '20px',
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '16px',
    padding: '6px 16px',
    fontWeight: 500,
    borderRadius: '4px',
    [theme.breakpoints.down(768)]: {
      marginRight: 0,
      color: theme.palette.text.general,
      fontSize: '14px',
      lineHeight: '19px',
      padding: 0,
      fontWeight: 600,
      borderRadius: 0,
      marginBottom: 10,
    },
  },
  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    height: '100%',
    '&:hover': {
      backgroundColor: theme.palette.background.second,
    },
  },
  usernameAndBalanceWrapper: {
    marginRight: '8px',
    textAlign: 'right',
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  balance: {
    color: theme.palette.text.second,
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,
  },

  menu: {
    width: '170px',
    marginTop: '0',
    marginLeft: '85px',
    display: 'flex',

    color: 'red',

    [theme.breakpoints.down(768)]: {
      width: '161px',
      marginTop: -56,
      marginLeft: '16px',
      display: 'flex',
    },
  },

  menuWrapper: {
    display: 'flex',
    justifyContent: 'start',
    width: '170px',
    padding: '13px 0 13px 33px',
    fontSize: 18,
    lineHeight: '140%',
    fontWeight: 400,
    color: theme.palette.text.general,
    backgroundColor: theme.palette.background.general,

    '&:hover': {
      // backgroundColor: '#CCE2FF',
      backgroundColor: theme.palette.background.second,
    },
    [theme.breakpoints.down(768)]: {
      display: 'flex',

      justifyContent: 'start',
      width: '161px',
      padding: '13px 0 13px 10px',
      fontSize: 16,
      lineHeight: '22px',
      fontWeight: 400,
      color: theme.palette.text.general,
      backgroundColor: theme.palette.background.general,

      '&:hover': {
        // backgroundColor: '#CCE2FF',
        backgroundColor: theme.palette.background.second,
      },
    },
  },

  list: {
    padding: 0,
  },

  icon: {
    marginRight: '13px',
    color: theme.palette.primary.main,
    height: 25,
    width: 25,
  },

  allowedRolesWrapper: {
    display: 'flex',
    marginRight: '30px',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      marginRight: '30px',
    },
  },

  allowedRolesMainWrapper: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '200px',
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  allowedRolesItem: {
    borderRadius: 0,
    height: 56,
    marginLeft: '10px',
    color: theme.palette.text.general,
    fontSize: '16px',
    transition: '.15s ease-in-out',
    '&:hover': {
      color: theme.palette.primary.main,
      transform: 'scale(1.01)',
    },
    [theme.breakpoints.down(768)]: {
      color: theme.palette.text.general,

      fontSize: '16px',
      transition: '.15s ease-in-out',
      '&:hover': {
        color: theme.palette.primary.main,
        transform: 'scale(1.01)',
      },
    },
  },

  сurrentAllowedRolesItem: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',
    borderBottom: `5px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    [theme.breakpoints.down(768)]: {
      background: 'none',
      backgroundColor: 'theme.palette.background.general',
      borderBottom: 0,
      color: theme.palette.primary.main,
    },
  },

  selectorsWrapper: {
    // width: 130,
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-around',
    padding: '0 16px',
    gap: 24,
  },

  notificationHandler: {
    cursor: 'pointer',
  },

  breadCrumbsWrapper: {
    width: '100%',
    display: 'flex',
    paddingLeft: 30,
    alignItems: 'center',
    margin: '10px 0 5px 0',
    height: 'min-content',
    [theme.breakpoints.down(768)]: {
      paddingLeft: 10,
    },
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
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  hintsTextNoActive: {
    fontSize: 18,
    lineHeight: '140%',
    fontWeight: 400,
    color: '#c4c4c4',
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  hideOnModile: {
    display: 'block',
    color: theme.palette.primary.main,

    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  menuIcon: {
    color: theme.palette.primary.main,
  },

  themeIcon: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  menuClientInfoWrapper: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'start',
      marginTop: '2px',
      gap: 15,
    },
  },
  menuClientInfo: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  menuClientInfoText: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
      display: 'block',
      fontSize: '14px',
      lineHeight: '19px',
      color: theme.palette.text.second,
      textAlign: 'end',
    },
  },

  mobileAllowedRolesWrapper: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
      width: '161px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      marginBottom: '20px',
    },
  },
  mobileUserroleTitle: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
      display: 'block',
      fontSize: '14px',
      lineHeight: '19px',
      color: theme.palette.text.second,
      marginTop: '20px',
      marginBottom: '20px',
      textTransform: 'capitalize',
    },
  },

  indicator: {
    [theme.breakpoints.down(768)]: {
      display: 'block',
      width: '2px',
      height: '16px',
      backgroundColor: '#006CFF',
    },
  },
  userRoleWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      gap: 5,
    },
  },
}))

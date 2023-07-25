import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  header: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.general,
  },

  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 240,

    [theme.breakpoints.down(1282)]: {
      display: 'none',
    },
  },

  logoWrapperShort: {
    minWidth: 75,
  },

  logo: {
    marginRight: 20,
  },

  logoNotShow: {
    display: 'none',
  },

  toolbar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 30,
  },

  titleWrapper: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      gap: 10,
    },
  },

  title: {
    fontSize: 18,
    lineHeight: ' 140%',
    color: theme.palette.text.second,
  },

  tooltipWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
  },

  hintsIcon: {
    width: '18px !important',
    height: '18px !important',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  hintsIconActive: {
    color: theme.palette.primary.main,
  },

  hintsTextActive: {
    fontSize: 16,
    color: theme.palette.primary.main,

    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  hintsTextNoActive: {
    fontSize: 16,
    color: '#c4c4c4',

    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  userRoleTitle: {
    color: theme.palette.text.second,
    marginRight: 15,

    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  allowedRolesMainWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 20,

    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  allowedRolesWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
    },
  },

  allowedRolesItem: {
    borderRadius: 0,
    height: 56,
    color: theme.palette.text.general,
    fontSize: 16,
    transition: '.15s ease-in-out',

    '&:hover': {
      color: theme.palette.primary.main,
      transform: 'scale(1.01)',
    },
  },

  currentAllowedRolesItem: {
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

  userRole: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 16,
    padding: '6px 16px',
    fontWeight: 500,
    borderRadius: '4px',

    [theme.breakpoints.down(768)]: {
      color: theme.palette.text.general,
      fontSize: '14px',
      lineHeight: '19px',
      padding: 0,
      fontWeight: 600,
      borderRadius: 0,
      marginBottom: 10,
    },
  },

  hideOnModile: {
    display: 'block',
    color: theme.palette.primary.main,

    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  selectorsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: '0 20px',
  },

  notificationHandler: {
    cursor: 'pointer',
  },

  themeIcon: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '0.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '0.3s ease',
    padding: '0 20px',
  },

  avatar: {
    [theme.breakpoints.down(768)]: {
      width: '32px',
      height: '32px',
    },
  },

  username: {
    color: theme.palette.text.second,
    fontSize: '14px',
    fontWeight: 500,
    width: 110,
    textOverflow: 'ellipsis',
  },

  usernameAndBalanceWrapper: {
    marginRight: 10,
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
    width: 170,
    marginTop: -5,
    marginLeft: 45,
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

  menuIcon: {
    color: theme.palette.primary.main,
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

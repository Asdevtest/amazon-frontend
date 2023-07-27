import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  header: {
    gridArea: 'header',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.general,
  },

  menuIconWrapper: {
    display: 'none',

    [theme.breakpoints.down(768)]: {
      display: 'block',
      padding: '14px 15px',
    },
  },

  menuIcon: {
    width: '24px !important',
    height: '24px !important',
    color: theme.palette.primary.main,
  },

  toolbar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 30,

    [theme.breakpoints.down(768)]: {
      paddingLeft: 0,
    },
  },

  titleWrapper: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      justifyContent: 'space-between',
    },
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.second,

    [theme.breakpoints.down(768)]: {
      width: 90,
      fontSize: 12,
    },
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
      alignItems: 'flex-start',
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
      borderBottom: 0,
      paddingLeft: 5,
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
      padding: '0 0 0 7px',
      fontWeight: 600,
      borderRadius: 0,
    },
  },

  hideOnModile: {
    display: 'block',
    color: theme.palette.primary.main,

    [theme.breakpoints.down(768)]: {
      display: 'none !important',
    },
  },

  selectorsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: '0 20px',

    [theme.breakpoints.down(768)]: {
      gap: 15,
      padding: '0 15px',
    },
  },

  notificationIcon: {
    cursor: 'pointer',

    [theme.breakpoints.down(768)]: {
      display: 'none !important',
    },
  },

  languageSelector: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
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

    [theme.breakpoints.down(768)]: {
      padding: '0 15px 0 0',
    },
  },

  avatar: {
    [theme.breakpoints.down(768)]: {
      width: '32px',
      height: '32px',
    },
  },

  userName: {
    color: theme.palette.text.second,
    fontSize: 14,
    fontWeight: 500,
    width: 110,
    textOverflow: 'ellipsis',
  },

  userNameAndBalanceWrapper: {
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
    margin: '15px 0 0 55px',
    cursor: 'pointer',

    [theme.breakpoints.down(768)]: {
      margin: '15px 0 0 10px',
    },
  },

  menuItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    width: 160,
    padding: '10px 20px',
    fontSize: 18,
    color: theme.palette.text.general,
    background: theme.palette.background.general,

    '&:hover': {
      background: theme.palette.background.second,
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 16,
    },
  },

  list: {
    padding: 0,
  },

  icon: {
    color: theme.palette.primary.main,
  },

  menuClientInfoWrapper: {
    display: 'none',

    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'center',
      padding: '10px 20px',
      gap: 10,
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
      textAlign: 'end',
    },
  },

  mobileAllowedRolesWrapper: {
    display: 'none',

    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '10px 20px',
    },
  },

  mobileUserRoleTitle: {
    display: 'none',

    [theme.breakpoints.down(768)]: {
      display: 'block',
      fontSize: '14px',
      lineHeight: '19px',
      marginBottom: '10px',
      textTransform: 'capitalize',
    },
  },

  indicator: {
    [theme.breakpoints.down(768)]: {
      display: 'block',
      width: 2,
      height: 19,
      background: theme.palette.primary.main,
    },
  },

  userRoleWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
}))

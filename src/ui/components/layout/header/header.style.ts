import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    padding: '0 20px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    lineHeight: 'inherit',
    background: theme.palette.background.general,
  },

  menuIconWrapper: {
    display: 'none',
  },

  titleWrapper: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  title: {
    fontSize: 16,
    lineHeight: '19px',
    fontWeight: 600,
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
  },

  hintsIconActive: {
    color: theme.palette.primary.main,
  },

  hintsTextActive: {
    fontSize: 16,
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  hintsTextNoActive: {
    fontSize: 16,
    lineHeight: '19px',
    color: '#c4c4c4',
  },

  userRoleTitle: {
    color: theme.palette.text.second,
    margin: '0 15px',
  },

  allowedRolesWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  allowedRolesItem: {
    borderRadius: 0,
    height: 56,
    color: theme.palette.text.general,
    fontSize: 16,
    transition: '.15s ease-in-out',

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  currentAllowedRolesItem: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',
    borderBottom: `5px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
  },

  userRole: {
    color: theme.palette.primary.main,
    fontSize: 16,
    padding: '6px 16px',
    fontWeight: 500,
    borderRadius: '4px',
  },

  selectorsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: '0 20px',
  },

  notificationIcon: {
    cursor: 'pointer',
    color: theme.palette.text.general,
  },

  languageSelector: {
    width: '18px',
    height: '18px',
  },

  themeIcon: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },

  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '0.3s ease',
    padding: '0 20px',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
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
  },

  list: {
    padding: 0,
  },

  icon: {
    color: theme.palette.primary.main,
  },

  menuClientInfoWrapper: {
    display: 'none',
  },

  menuClientInfo: {
    display: 'none',
  },

  menuClientInfoText: {
    display: 'none',
  },

  mobileAllowedRolesWrapper: {
    display: 'none',
  },

  mobileUserRoleTitle: {
    display: 'none',
  },

  indicator: {},

  userRoleWrapper: {},

  toastContainer: {
    background: `${theme.palette.background.general} !important`,

    button: {
      svg: {
        color: theme.palette.text.general,
      },
    },
  },
}))

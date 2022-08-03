import {makeStyles} from '@material-ui/styles'

export const useClassNames = makeStyles(theme => ({
  mainWrapper: {
    width: '100%',
  },

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
    color: theme.palette.text.secondary,
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
    fontSize: '14px',
    fontWeight: 500,
    width: '110px',
    textOverflow: 'ellipsis',
  },
  userroleTitle: {
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
    cursor: 'pointer',
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
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '16px',
    transition: '.15s ease-in-out',
    '&:hover': {
      color: '#0460DE',
      transform: 'scale(1.01)',
    },
  },

  сurrentAllowedRolesItem: {
    background: 'linear-gradient(360deg, rgba(0, 108, 255, 0.2) 10.71%, rgba(0, 108, 255, 0) 100%)',

    borderBottom: '5px solid #0460DE',
    color: '#0460DE',
  },

  languageSelectorWrapper: {
    width: '90px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  breadCrumbsWrapper: {
    // position: 'absolute',
    width: '100%',
    display: 'flex',
    paddingLeft: 30,
    alignItems: 'center',
    margin: '30px 0 5px 0',
    height: 'min-content',
  },

  tooltipWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
  },

  hintsTextActive: {
    fontSize: 18,
    lineHeight: '140%',
    fontWeight: 400,
    color: '#006CFF',
  },
  hintsTextNoActive: {
    fontSize: 18,
    lineHeight: '140%',
    fontWeight: 400,
    color: '#c4c4c4',
  },

  e: {},
}))

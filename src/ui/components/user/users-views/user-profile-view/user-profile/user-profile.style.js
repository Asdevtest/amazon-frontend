import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  avatar: {
    height: '140px',
    width: '140px',
    borderRadius: '50%',
    objectFit: 'cover',
    [theme.breakpoints.down(768)]: {
      height: '91px',
      width: '91px',
    },
  },
  username: {
    color: theme.palette.text.general,
    fontSize: '23px',
    fontWeight: 500,
    [theme.breakpoints.down(768)]: {
      fontSize: '12px',
      fontWeight: 600,
    },
  },
  text: {
    color: theme.palette.text.second,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 500,
    color: theme.palette.text.general,
  },
  tableHeadTypography: {
    color: theme.palette.text.general,
    fontWeight: 500,
  },
  paper: {
    padding: '24px',
    display: 'flex',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  mainBox: {
    display: 'flex',
  },
  sendOrderBox: {
    marginRight: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  hisGoodsOptionsBox: {
    display: 'flex',
  },
  filterGoods: {
    color: 'rgba(0, 123, 255, 1)',
    marginRight: '16px',
  },
  ignoreGoods: {
    color: 'rgba(0, 123, 255, 1)',
  },
  normalBox: {
    display: 'flex',
    margin: '12px 0',
    gap: '16px',
  },
  visibilityIcon: {
    color: 'rgba(0, 123, 255, 1)',
    marginRight: '8px',
  },

  rightSideWrapper: {
    width: '100%',
  },

  rolesWrapper: {
    marginTop: '20px',
  },

  roles: {
    display: 'flex',
  },

  role: {
    marginLeft: '10px',
    color: theme.palette.text.general,
  },

  ratingWrapper: {
    display: 'flex',
    marginTop: '10px',
  },

  userRating: {
    marginLeft: '15px',
    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      fontWeight: 600,
    },
  },

  userEmail: {
    fontWeight: 'bold',
    marginTop: '10px',
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '12px',
      fontWeight: 600,
    },
  },

  standartText: {
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '12px',
      fontWeight: 600,
    },
  },

  badge: {
    backgroundColor: theme.palette.background.general,
    borderRadius: '50%',
    border: `1px solid ${theme.palette.primary.main}`,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',

    '&:hover': {
      transform: 'scale(1.1) rotate(45deg)',
    },
  },

  changeBtn: {
    marginTop: '5px',
    height: '20px',
    color: '#fff',
    [theme.breakpoints.down(768)]: {
      width: '260px',
      height: 40,
    },
  },

  avatarWrapper: {
    position: 'relative',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover > :not(:last-child)': {
      transition: '0.6s ease-out',
      opacity: '0.2',
    },

    '&:hover > :last-child': {
      visibility: 'visible',
      transform: 'rotate(90deg)',
      transition: '0.6s ease',
    },
  },

  icon: {
    position: 'absolute',
    top: 'calc(50% - 12px)',
    left: 'calc(50% - 15px)',
    visibility: 'hidden',
  },

  writeBtn: {
    marginTop: 20,
    [theme.breakpoints.down(768)]: {
      width: '260px',
      height: 40,
    },
  },

  userButtonsWrapper: {
    display: 'block',
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  userButtonsMobileWrapper: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 30,
    },
  },
}))

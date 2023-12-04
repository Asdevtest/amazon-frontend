import { makeStyles } from 'tss-react/mui'

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

  normalBox: {
    display: 'flex',
    margin: '12px 0',
    gap: '16px',
  },

  rightSideWrapper: {
    width: '100%',
  },

  rolesWrapper: {
    marginTop: '20px',
  },

  roles: {
    display: 'flex',
    flexWrap: 'wrap',
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
    opacity: '1 !important', // undisabled style

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
    cursor: 'pointer',
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
    color: '#fff',

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

  leaveReviewBtnWrapper: {
    paddingTop: 20,
    width: 'fit-content',
    marginLeft: 'auto !important',
  },

  leaveReviewBtn: {
    color: '#fff',
    height: 40,
    borderRadius: 7,
    padding: '10px 20px',
  },
}))

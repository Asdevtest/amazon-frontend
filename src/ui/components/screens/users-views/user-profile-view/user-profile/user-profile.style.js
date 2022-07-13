import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  avatar: {
    height: '140px',
    width: '140px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  username: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '23px',
    fontWeight: 500,
  },
  text: {
    color: '#89919C',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 500,
    color: 'rgba(61, 81, 112, 1)',
  },
  tableHeadTypography: {
    color: 'rgb(61, 81, 112)',
    fontWeight: 500,
  },
  paper: {
    padding: '24px',
    display: 'flex',
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
  },
  visibilityIcon: {
    color: 'rgba(0, 123, 255, 1)',
    marginRight: '8px',
  },
  boxFeedbackCard: {
    marginRight: '16px',
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
  },

  ratingWrapper: {
    display: 'flex',
    marginTop: '10px',
  },

  userRating: {
    marginLeft: '15px',
  },

  userEmail: {
    fontWeight: 'bold',
    marginTop: '10px',
  },

  badge: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    border: '1px solid #007BFF',
    cursor: 'pointer',
    transition: '0.3s ease',

    '&:hover': {
      transform: 'scale(1.1) rotate(45deg)',
    },
  },

  changeBtn: {
    marginTop: '5px',
    height: '20px',
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
}))

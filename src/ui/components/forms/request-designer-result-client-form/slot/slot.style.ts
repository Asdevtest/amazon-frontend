import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  imageObjWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: 'min-content',
  },

  imageObjSubWrapper: {
    width: 161,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },

  imageObjIndex: {
    fontWeight: 700,
    fontSize: 20,
    color: theme.palette.text.second,
    marginRight: 10,
  },

  imageObjTitle: {
    fontSize: 14,
    fontWeight: 600,
    wordBreak: 'break-word',
    whiteSpace: 'pre-line',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },

  imageWrapper: {
    width: 161,
    height: 161,
    borderRadius: 4,
    backgroundColor: theme.palette.input.customDisabled,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  isHaveImage: {
    backgroundColor: 'inherit',
  },

  mainImageWrapper: {
    position: 'relative',
    padding: 3,
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23007BFFFF' strokeWidth='4' strokeDasharray='6%2c 14' strokeDashoffset='90' strokeLinecap='square'/%3e%3c/svg%3e")`,
  },

  mainStarIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 99,
  },

  imageListItem: {
    width: '100%',
    height: '100%',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',

    transition: '.3s ease',
    cursor: 'pointer',
    '&: hover': {
      transform: 'scale(1.05)',
    },
  },

  commentBtn: {
    width: 161,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    paddingRight: '40px',
  },

  commentIcon: {
    position: 'absolute',
    top: '11px',
    right: '15px',
    width: 15,
    height: 15,
  },

  commentBtnWrapper: {
    position: 'relative',
  },

  commentHideBtn: {
    width: 161,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: ' center',
    height: 40,
    paddingRight: 5,
    cursor: 'pointer',
  },

  list: {
    padding: '1px 0',
  },

  imageObjInput: {
    width: 400,
    height: 'auto',
    background: theme.palette.background.second,
  },

  subImageObjInput: {
    overflowY: 'auto',
  },
}))

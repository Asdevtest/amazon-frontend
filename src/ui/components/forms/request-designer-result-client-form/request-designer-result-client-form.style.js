import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalMainWrapper: {
    width: 1500,
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  headerLabel: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.main,
  },

  textMargin: {
    marginBottom: 20,
  },

  fieldLabel: {
    fontSize: 14,
    color: theme.palette.text.second,
    whiteSpace: 'nowrap',
    marginBottom: 5,
  },

  simpleSpan: {
    fontWeight: '600 !important',
    fontSize: 14,
  },

  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 30,
    gap: 20,
  },

  containerField: {
    width: '140px !important',
    marginBottom: '0 !important',
  },

  linkInput: {
    width: 350,
  },

  button: {
    padding: '0 15px',
    whiteSpace: 'nowrap',
  },

  cancelButton: {
    color: theme.palette.text.general,
  },

  downloadsWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 20,
  },

  downloadsCheckWrapper: {
    display: 'flex',
    alignItems: 'center',
    transition: '.3s ease',
    cursor: 'pointer',

    '&:hover': {
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

  bodyWrapper: {
    minHeight: 300,
    maxHeight: 400,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 27,
    marginTop: 30,
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  imageObjWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: 'min-content',
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

  headerRightSubWrapper: {
    display: 'flex',
    gap: 30,
  },

  viewLinkWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  linkSpan: {
    color: theme.palette.primary.main,
  },

  heightFieldAuto: {
    height: 'auto',
    width: 520,

    padding: 0,
  },

  mainStarIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 99,
  },

  mainImageWrapper: {
    position: 'relative',
    padding: 3,
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23007BFFFF' strokeWidth='4' strokeDasharray='6%2c 14' strokeDashoffset='90' strokeLinecap='square'/%3e%3c/svg%3e")`,
  },

  imageObjIndex: {
    fontWeight: 700,
    fontSize: 20,
    color: theme.palette.text.second,
    marginRight: 10,
  },

  imageObjSubWrapper: {
    width: 161,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
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

  clientComment: {
    fontSize: 18,
    color: '#DF0C0C',
  },

  commentBtnWrapper: {
    position: 'relative',
  },

  imageObjInput: {
    width: 400,
    height: 'auto',
    background: theme.palette.background.second,
  },

  subImageObjInput: {
    overflowY: 'auto !important',
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

  imagesModalBtn: {
    width: 40,
    height: 40,
  },

  list: {
    padding: '1px 0',
  },
}))

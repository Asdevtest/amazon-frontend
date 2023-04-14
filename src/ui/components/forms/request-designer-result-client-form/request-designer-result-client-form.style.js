/* eslint-disable no-unused-vars */
import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalMainWrapper: {
    width: 1500,
    // maxHeight: 800,

    // padding: '0 10px',
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

    // marginBottom: 20,
  },

  secondSpanText: {
    color: theme.palette.text.second,
  },

  labelMargin: {
    marginBottom: 10,
  },

  textMargin: {
    marginBottom: 20,
  },

  headerSubText: {
    fontSize: 14,
    color: theme.palette.text.second,
    whiteSpace: 'pre-line',
    breakWord: 'word-break',
  },

  fieldLabel: {
    fontSize: 14,
    color: theme.palette.text.second,
    whiteSpace: 'nowrap',
    marginBottom: 5,
  },

  titleWrapper: {
    display: 'flex',
    gap: 5,
    // alignItems: 'center',
  },

  accordionMain: {
    boxShadow: 'none',
  },

  accordion: {
    display: 'flex !important',
    justifyContent: 'flex-start',
    padding: 0,

    width: 'min-content',
  },

  accordionContent: {
    flexGrow: 0,
    width: 'max-content',
  },

  expandIconWrapper: {
    margin: '0 auto 0 20px',
  },

  spanText: {
    color: theme.palette.primary.main,
  },

  uploadGuidWrapper: {
    display: 'flex',
    gap: 5,
  },

  simpleSpan: {
    fontWeight: 600,
    fontSize: 14,
  },

  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 30,
    // marginBottom: 30,
    gap: 30,
  },

  containerField: {
    width: 'min-content !important',
    marginBottom: '0 !important',
  },

  linkInput: {
    width: 350,
  },

  button: {
    padding: '0 25px',
    whiteSpace: 'nowrap',
  },

  cancelButton: {
    color: theme.palette.text.general,
  },

  downloadsWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 30,
  },

  downloadsCheckWrapper: {
    display: 'flex',
    alignItems: 'center',

    gap: 10,
    transition: '.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },

  commentBtn: {
    width: '100%',

    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    paddingRight: '40px',
  },

  commentIcon: {
    // marginLeft: '15px',
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
    // background: 'grey',
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  imageObjWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 161,
    // border: '1px solid red',
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
    // position: 'relative',
  },

  isHaveImage: {
    backgroundColor: 'inherit',
  },

  headerRightSubWrapper: {
    display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'flex-end',
    gap: 50,
    // width: '100%',
  },

  viewLinkWrapper: {
    // height: '40px',
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
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23007BFFFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='90' stroke-linecap='square'/%3e%3c/svg%3e")`,
  },

  imageObjIndex: {
    fontWeight: 700,
    fontSize: 20,
    color: theme.palette.text.second,
    marginRight: 10,
  },

  imageObjSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },

  imageObjTitle: {
    fontSize: 14,
    fontWeight: 600,
    wordBreak: 'break-word',
    // whiteSpace: 'break-spaces',

    whiteSpace: 'pre-line',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },

  clientComment: {
    fontSize: 18,
    // color: theme.palette.text.red,
    color: '#DF0C0C',
  },

  imageObjInput: {
    width: '100%',
    // width: 133,
    height: 95,
  },

  subImageObjInput: {
    // width: 133,
    height: '90px !important',
    overflowY: 'auto !important',
  },

  commentHideBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: ' center',
    height: 40,
    paddingRight: 5,
    cursor: 'pointer',
  },

  bigPlusWrapper: {
    height: 205,
    width: 161,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bigPlus: {
    color: theme.palette.primary.main,

    // marginTop: 40,
    margin: '15px 0 30px 0',
    cursor: 'pointer',
    transition: '.3s ease',
    transform: 'scale(2.8)',

    '&:hover': {
      transform: 'scale(3)',
    },
  },

  cameraIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 85,
    height: 85,
  },

  cameraIcon: {
    color: theme.palette.primary.main,
    transform: 'scale(3.5)',
  },

  imageSubWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',

    transition: '.3s ease',
    cursor: 'pointer',
    '&: hover': {
      transform: 'scale(1.05)',
    },
  },

  imageListItem: {
    width: '100%',
    height: '100%',

    // backgroundImage: `linear-gradient(to right, #fff 40%, ${theme.palette.primary.main} 40%)`,
    // backgroundSize: '10px 1px',
    // backgroundRepeat: 'repeat-x',
  },

  imageUploadText: {
    fontSize: 18,
  },

  pasteInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: '10px',
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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

  imagesModalBtnsWrapper: {
    display: 'flex',
    gap: 20,
  },

  imagesModalBtn: {
    width: 40,
    height: 40,
  },
}))

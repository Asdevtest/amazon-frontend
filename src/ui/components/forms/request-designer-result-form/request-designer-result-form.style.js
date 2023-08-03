/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

import { borderRadius } from '@mui/system'

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

  mainTitleMargin: {
    marginBottom: 35,
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

  headerLeftSubWrapper: {
    maxWidth: '50%',
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
    gap: 30,
  },

  containerField: {
    width: 'min-content !important',
    marginBottom: '0 !important',
  },

  linkInput: {
    width: 350,
  },

  bodyWrapper: {
    minHeight: 300,
    maxHeight: 400,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 27,
    paddingTop: 30,
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  bodySubWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 24,
    paddingRight: 15,
  },

  imageObjWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 161,
    height: 'min-content',
    position: 'relative',
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
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 30,
    width: '100%',
  },

  heightFieldAuto: {
    height: 'auto',
    width: '100%',

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
    alignSelf: 'flex-start',
  },

  imageObjSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  clientComment: {
    fontSize: 18,
    color: '#DF0C0C',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },

  imageObjInput: {
    width: 133,
    height: 'auto',
  },

  bigPlusWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    justifySelf: 'flex-start',
    marginLeft: 100,
  },

  bigPlus: {
    color: theme.palette.primary.main,
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
    background: theme.palette.background.general,
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

  removeIconWrapper: {
    background: 'rgba(73, 73, 73, 0.65)',
    borderRadius: 50,
    width: 37,
    height: 37,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -18,
    top: -18,
    zIndex: 99,

    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  removeIcon: {
    color: '#fff',
  },
}))

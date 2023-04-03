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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 30,
    // marginBottom: 30,
    gap: 30,
  },

  containerField: {
    width: 'min-content',
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
    background: theme.palette.input.customDisabled,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageObjIndex: {
    fontWeight: 700,
    fontSize: 20,
    color: theme.palette.text.second,
    marginRight: 10,
  },

  imageObjSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  imageObjInput: {
    // width: '100%',
    width: 133,
    height: 'auto',
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
    transform: 'scale(3.5)',

    '&:hover': {
      transform: 'scale(3.8)',
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
    // objectPosition: 'center',

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

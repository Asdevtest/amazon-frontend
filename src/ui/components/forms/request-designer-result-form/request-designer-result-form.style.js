import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalMainWrapper: {
    width: 1150,
    padding: 10,
  },

  headerWrapper: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  headerLabel: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.main,
  },

  mainTitleMargin: {
    marginBottom: 20,
  },

  labelMargin: {
    marginBottom: 10,
  },

  textMargin: {
    marginBottom: 10,
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
    marginTop: 20,
    gap: 30,
  },

  containerField: {
    width: 'max-content',
    marginBottom: '0 !important',
  },

  linkInput: {
    width: 350,
  },

  bodyWrapper: {
    minHeight: 225,
    maxHeight: 350,
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
    gap: 25,
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
    gap: 20,
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
    zIndex: 7,
  },

  imageObjIndex: {
    fontWeight: 700,
    fontSize: 20,
    color: theme.palette.text.second,
    alignSelf: 'flex-start',
  },

  imageObjSubWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },

  clientComment: {
    fontSize: 14,
    lineHeight: '19px',
    color: '#DF0C0C',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },

  imageObjInput: {
    width: 140,
    height: 46,
  },

  inputComment: {
    padding: 8,
    fontSize: 14,
    lineHeight: '19px',
  },

  bigPlusWrapper: {
    width: 56,
    height: 56,
  },

  bigPlus: {
    width: '56px !important',
    height: '56px !important',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.05)',
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
    width: 161,
    height: 161,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
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
    cursor: 'pointer',
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
    zIndex: 7,

    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  removeIcon: {
    color: '#fff',
  },

  comment: {
    margin: '0 !important',
  },

  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 30,
  },
}))

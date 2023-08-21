import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: 30,
    maxWidth: 790,
    margin: '0 auto',
    borderRadius: 7,
    backgroundColor: theme.palette.background.general,

    [theme.breakpoints.down(1280)]: {
      maxWidth: 390,
    },
  },

  headerText: {
    color: theme.palette.text.general,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '140%',
    textTransform: 'uppercase',
    marginBottom: 20,
  },

  timeText: {
    color: theme.palette.text.second,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '16px',

    position: 'absolute',
    top: 0,
    right: 20,
  },

  descriptionText: {
    color: theme.palette.text.second,
    fontSize: 16,
    minHeight: 100,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    width: '50%',
  },

  footerWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '48px',
    // gap: 20,
  },

  actionBtnWrapperStyleNotFirst: {
    marginLeft: '42px',
  },
  actionButton: {
    // flex: 1,
    // display: 'flex',

    padding: '0 15px',
  },

  editButton: {
    width: '252px',
  },

  successBtn: {
    width: '197px',
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',

    transition: '.3s ease',
  },

  mainWrapper: {
    width: '100%',
    position: 'relative',
  },

  infosWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  fieldLabel: {
    fontSize: 14,
    color: theme.palette.text.second,
    whiteSpace: 'nowrap',
    marginBottom: 5,
  },

  imageObjWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 100,
    // border: '1px solid red',
    height: 'min-content',
  },

  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 4,
    backgroundColor: theme.palette.input.customDisabled,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  mainImageWrapper: {
    position: 'relative',

    padding: 3,
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23007BFFFF' strokeWidth='4' strokeDasharray='6%2c 14' strokeDashoffset='90' strokeLinecap='square'/%3e%3c/svg%3e")`,
  },

  mainStarIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 99,
  },

  imageListItem: {
    width: '100%',
    height: '100%',
  },

  imagesWrapper: {
    display: 'flex',
    gap: 15,
  },

  moreImagesWrapper: {
    background: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },

  moreImagesText: {
    fontSize: 36,
    color: '#fff',
  },

  containerField: {
    width: 'min-content !important',
    marginBottom: '0 !important',
  },

  simpleSpan: {
    fontWeight: 600,
    fontSize: 14,
    whiteSpace: 'nowrap',
  },

  linkSpan: {
    color: theme.palette.primary.main,
  },

  footerSubWrapper: {
    display: 'flex',
    gap: 50,
  },
}))

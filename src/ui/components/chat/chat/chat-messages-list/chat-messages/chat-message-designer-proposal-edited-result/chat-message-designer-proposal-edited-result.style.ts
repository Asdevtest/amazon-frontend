import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    maxWidth: 1080,
    padding: 30,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
    backgroundColor: theme.palette.background.general,
    borderRadius: 7,

    [theme.breakpoints.down(1280)]: {
      maxWidth: 390,
    },
  },

  mainWrapper: {
    width: '100%',
  },

  headerWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  headerText: {
    marginBottom: 10,
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: theme.palette.text.general,
  },

  timeText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  infosWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 40,
  },

  descriptionText: {
    width: '100%',
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.general,
    wordBreak: 'break-word',
  },

  imagesWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 15,
  },

  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: theme.palette.input.customDisabled,
  },

  mainImageWrapper: {
    padding: 3,
    border: `1px solid ${theme.palette.primary.main}`,
  },

  mainStarIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 100,
  },

  moreImagesWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 36,
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.4)',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  footerWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 50,
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

  // editButton: {
  //   width: '200px',
  // },

  successBtn: {
    width: '197px',
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },

  fieldLabel: {
    fontSize: 14,
    color: theme.palette.text.second,
    whiteSpace: 'nowrap',
    marginBottom: 5,
  },

  containerField: {
    width: 'min-content !important',
    marginBottom: '0 !important',
  },

  simpleSpan: {
    fontWeight: '600 !important',
    fontSize: 14,
    whiteSpace: 'nowrap',
  },

  linkSpan: {
    color: theme.palette.primary.main,
  },
}))

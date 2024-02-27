import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 1370,
    padding: 10,
    overflowY: 'hidden',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '10px',
    gap: '20px',
    position: 'sticky',
    top: 0,

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  },

  headerDetails: {
    display: 'flex',
    gap: '80px',

    [theme.breakpoints.down(768)]: {
      gap: '20px',
      flexWrap: 'wrap',
    },
  },

  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  headerText: {
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.text.second,
    textTransform: 'capitalize',
  },

  textBold: {
    fontWeight: 600,
  },

  content: {
    display: 'flex',
    gap: '50px',

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
    },
  },

  categoryTitle: {
    fontSize: '16px',
    fontWeight: 600,
  },

  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '380px',
  },

  category: {
    display: 'flex',
    gap: '2px',
    flexDirection: 'column',
  },

  requestInfo: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '20px',
  },

  requestInfoWrapper: {
    width: '100%',
    flexDirection: 'column',
    gap: '20px',
    display: 'flex',
  },

  suggestDeal: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',

    '& > div': {
      height: 'fit-content',
    },
  },

  editorWrapper: {
    maxHeight: '400px !important',
    maxWidth: '920px',
  },

  controlsWrapper: {
    flexWrap: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginRight: 5,
  },

  listingText: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
  },

  stopBtn: {
    width: '100%',
    background: '#F3AF00',
    color: '#001029',
    '&:hover': {
      opacity: '0.8',
      background: '#F3AF00',
    },
  },

  publishBtn: {
    width: '100%',
    height: 40,
  },

  listingButton: {
    color: theme.palette.primary.main,
  },

  buttonsWrapper: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },

  recoverBtn: {
    width: '100%',
  },
}))

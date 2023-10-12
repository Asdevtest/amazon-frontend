import { makeStyles } from 'tss-react/mui'

export const useFreelanceRequestDetailsModalStyles = makeStyles()(theme => ({
  title: {
    fontWeight: 600,
  },

  wrapper: {
    height: '100%',
    maxHeight: '884px',
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
    backgroundColor: theme.palette.background.general,

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

  headerText: {
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.text.second,

    display: 'flex',
    alignItems: 'center',
    gap: '10px',

    span: {
      // color: theme.palette.text.general,
      fontWeight: 600,
    },
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

  productImages: {
    marginTop: '-10px',
    '& > div > div': {
      paddingTop: '0px',
    },
  },

  category: {
    display: 'flex',
    gap: '2px',
    flexDirection: 'column',
  },

  filesItem: {
    width: 'fit-content',
  },

  requestInfo: {
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

  filesList: {
    paddingBottom: '20px',
    width: 'fit-content',
  },

  editorWrapper: {
    maxHeight: '400px !important',
    maxWidth: '796px',
  },

  controlsWrapper: {
    flexWrap: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  listingCheckbox: {
    color: theme.palette.primary.main,
  },

  listingText: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  listingButton: {
    width: '100%',
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
}))

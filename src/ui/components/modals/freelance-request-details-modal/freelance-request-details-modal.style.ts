import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 1120,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '10px',
    gap: '20px',
    position: 'sticky',
    top: 0,
  },

  headerDetails: {
    display: 'flex',
    gap: '20px',
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
    gap: '20px',
  },

  categoryTitle: {
    fontSize: '16px',
    fontWeight: 600,
  },

  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  category: {
    display: 'flex',
    flexDirection: 'column',
  },

  requestInfo: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-between',
  },

  requestInfoWrapper: {
    width: '100%',
    flexDirection: 'column',
    gap: '20px',
    display: 'flex',
  },

  suggestDeal: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  editorWrapper: {
    maxHeight: '400px !important',
    maxWidth: '920px',
    marginBottom: 20,
  },

  controlsWrapper: {
    flexWrap: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
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
      color: '#001029',
      background: '#F3AF00',
    },
  },

  buttonsWrapper: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    position: 'relative',
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
    lineHeight: '19px',
    textTransform: 'uppercase',
    marginBottom: 20,
  },

  timeText: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  descriptionText: {
    color: theme.palette.text.second,
    fontSize: 16,
    minHeight: 100,
    wordBreak: 'break-word',
    whiteSpace: 'pre-line',
  },

  footerWrapper: {
    marginTop: '20px',
  },
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '30px',
    gap: 40,
  },

  actionButton: {
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

  mainWrapper: {
    display: 'flex',
    gap: 20,
  },

  mainSubWrapper: {
    flex: '1 1 auto',
  },

  divider: {
    height: 'auto',
  },

  labelValueBlockWrapper: {
    minWidth: 260,
    maxWidth: 'max-content',
  },

  priceAmazonWrapper: {
    display: 'flex',
  },

  redText: {
    color: '#FB1D5B',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    whiteSpace: 'nowrap',
    textDecorationLine: 'line-through',
    marginLeft: '5px !important',
  },

  cashBackPrice: {
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    whiteSpace: 'nowrap',
  },

  accentText: {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.text.general,
    whiteSpace: 'nowrap',
  },

  infosWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 20,
  },

  fieldLabel: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  massageHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  idWrapper: {
    display: 'flex',
    gap: 5,
  },

  idTitle: {
    color: theme.palette.text.general,
  },
  idText: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  blackText: {
    color: '#001029',
  },

  editorMaxHeight: {
    height: 300,
  },

  paragraphWrapper: {
    minHeight: 180,
    marginBottom: 20,
  },
}))

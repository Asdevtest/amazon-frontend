import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.general,
    padding: '40px 30px',
    width: 1200,
    margin: '0 auto',
    // border: '1px solid #4CAF50',
    borderRadius: '4px',
    '& p, h1, h2, h3, h4, h5, span': {
      margin: 0,
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
    marginTop: '48px',
    gap: 40,
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

  mainWrapper: {
    display: 'flex',
    gap: 20,
    position: 'relative',
  },

  mainSubWrapper: {
    minWidth: 250,
    maxWidth: '50%',
    // width: 'max-content',
  },

  divider: {
    height: 'auto',

    // borderColor: theme.palette.background.border,
  },

  labelValueBlockWrapper: {
    minWidth: 260,
    maxWidth: 'max-content',

    // marginBottom: 24,
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

    minHeight: 120,
  },

  infosProposalWrapper: {
    display: 'flex',
    // flexWrap: 'wrap',
    gap: 20,

    minHeight: 120,
  },

  fieldLabel: {
    fontSize: 14,
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
    marginTop: 20,
    marginBottom: 10,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    maxWidth: 1075,
    padding: 30,
    margin: '0 auto',
    borderRadius: 7,
    backgroundColor: theme.palette.background.general,

    [theme.breakpoints.down(768)]: {
      padding: '20px 16px',
    },
  },

  mainWrapper: {
    display: 'flex',
    gap: 30,

    [theme.breakpoints.down(1365)]: {
      flexDirection: 'column',
      gap: 20,
    },
  },

  mainWrapperShowChatInfo: {
    [theme.breakpoints.down(1750)]: {
      flexDirection: 'column',
    },
  },

  mainSubWrapper: {
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    flex: 1,

    [theme.breakpoints.down(1280)]: {
      minWidth: 'max-content',
    },
  },

  mainSubWrapperShowChatInfo: {
    [theme.breakpoints.down(1350)]: {
      minWidth: 'max-content',
    },
  },

  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  headerText: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: theme.palette.text.general,
  },

  timeText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,

    [theme.breakpoints.down(1280)]: {
      fontSize: 12,
      lineHeight: '16px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 10,
      lineHeight: '14px',
    },
  },

  idWrapper: {
    display: 'flex',
    gap: 5,
  },

  idText: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    color: theme.palette.text.second,

    [theme.breakpoints.down(1280)]: {
      fontSize: 12,
      lineHeight: '16px',
    },

    [theme.breakpoints.down(768)]: {
      fontSize: 10,
      lineHeight: '14px',
    },
  },

  idTitle: {
    color: theme.palette.text.general,
  },

  descriptionText: {
    width: '100%',
    maxHeight: 150,
    overflow: 'auto',
    color: theme.palette.text.second,
    wordBreak: 'break-word',
    whiteSpace: 'pre-line',

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  infosWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  labelValueBlock: {
    width: '100%',

    [theme.breakpoints.down(768)]: {
      flexWrap: 'wrap',
      gap: 5,
    },
  },

  labelValueBlockShowChatInfo: {
    [theme.breakpoints.down(1350)]: {
      flexWrap: 'wrap',
      gap: 5,
    },
  },

  priceAmazonWrapper: {
    display: 'flex',
    gap: 5,
  },

  redText: {
    color: '#FB1D5B',
    fontSize: 14,
    lineHeight: '19px',
    whiteSpace: 'nowrap',
    textDecorationLine: 'line-through',
  },

  cashBackPrice: {
    fontSize: 14,
    lineHeight: '19px',
    whiteSpace: 'nowrap',
  },

  blackText: {
    color: '#001029',
  },

  accentText: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,
    color: theme.palette.text.general,
    whiteSpace: 'nowrap',
  },

  fieldLabel: {
    marginBottom: 10,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  divider: {
    width: 1,
    height: 'auto',
    background: 'rgba(255, 255, 255, 0.12)',

    [theme.breakpoints.down(1365)]: {
      width: '100%',
      height: 1,
    },
  },

  dividerShowChatInfo: {
    [theme.breakpoints.down(1750)]: {
      height: 1,
      width: 'auto',
    },
  },

  btnsWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '20px',
    gap: 40,
  },

  actionButton: {
    padding: '0 15px',
  },

  successBtn: {
    backgroundColor: '#4CAF50',

    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },

  editButton: {},
}))

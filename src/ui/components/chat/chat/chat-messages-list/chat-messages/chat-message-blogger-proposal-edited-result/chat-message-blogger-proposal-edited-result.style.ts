import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.general,
    padding: 30,
    maxWidth: 900,
    margin: '0 auto',
    borderRadius: 7,

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
  },

  footerWrapper: {
    marginTop: '20px',
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

  mainWrapper: {
    // display: 'flex',
    // gap: 20,
    width: '100%',
    position: 'relative',
  },

  infosWrapper: {
    display: 'flex',
    // width: 'max-content',
  },

  infosSubWrapper: {
    display: 'flex',

    width: '50%',
    // width: 'max-content',
  },

  fieldLabel: {
    fontSize: 14,
    color: theme.palette.text.second,
  },

  infoItemWrapper: {
    background: theme.palette.background.disabled,
    width: 310,
    height: 40,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px',
  },

  infoLinksItemWrapper: {
    background: theme.palette.background.disabled,
    maxWidth: 415,
    height: 40,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px',
  },

  infoItemText: {
    color: theme.palette.text.general,
  },

  infoLinkText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    // maxWidth: 450,
    // color: theme.palette.primary.main,
    color: '#006CFF',
  },

  fieldContainer: {
    width: 'min-content !important',

    '&: last-of-type': {
      marginBottom: '0 !important',
    },
  },

  rightInfosSubWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: 40,
  },

  timeInfoItemWrapper: {
    width: 167,
    background: theme.palette.background.green,
  },

  infoItemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    maxHeight: 170,
    overflowY: 'auto',
    overflowX: 'hidden',
  },

  linkInfoItemList: {
    width: 525,
  },

  amazonOrder: {
    display: 'flex',
    alignItems: 'center',
  },
  amazonOrderText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',

    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    backgroundColor: theme.palette.background.general,
    padding: 30,
    maxWidth: 790,
    margin: '0 auto',
    borderRadius: 7,

    [theme.breakpoints.down(1280)]: {
      maxWidth: 390,
    },
  },

  mainWrapper: {
    position: 'relative',
  },

  timeText: {
    position: 'absolute',
    top: 0,
    right: 20,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  headerText: {
    color: theme.palette.text.general,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '19%',
    textTransform: 'uppercase',
    marginBottom: 20,
  },

  descriptionText: {
    color: theme.palette.text.second,
    fontSize: 16,
    minHeight: 50,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
  },

  infosWrapper: {
    display: 'flex',
    gap: 20,
  },

  infosSubWrapper: {
    flex: '1 1 auto',
  },

  rightInfosSubWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
  },

  fieldLabel: {
    fontSize: 14,
    color: theme.palette.text.second,
    marginBottom: 5,
  },

  fieldContainer: {
    marginBottom: 0,
  },

  infoItemWrapper: {
    background: theme.palette.background.disabled,
    maxWidth: 300,
    height: 40,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px',
  },

  amazonOrder: {
    display: 'flex',
    alignItems: 'center',
  },

  infoItemText: {
    color: theme.palette.text.general,
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

  timeInfoItemWrapper: {
    maxWidth: 150,
    background: theme.palette.background.green,
  },

  footerWrapper: {
    marginTop: '20px',
  },
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    marginTop: '30px',
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

  infoLinksItemWrapper: {
    background: theme.palette.background.disabled,
    maxWidth: 400,
    height: 40,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px',
  },

  infoLinkText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    // maxWidth: 450,
    // color: theme.palette.primary.main,
    color: '#006CFF',
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
    width: 400,
  },
}))

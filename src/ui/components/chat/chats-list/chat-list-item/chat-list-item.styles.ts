import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '15px 10px',
    cursor: 'pointer',
  },

  avatarWrapper: {
    height: 49,
    width: 49,
  },

  rightSide: {
    width: '100%',
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  titleText: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: '25px',
    color: theme.palette.text.general,
    maxWidth: 140,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
      maxWidth: 115,
    },
  },

  messageDate: {
    margin: 0,
    fontSize: 12,
    color: theme.palette.text.second,
  },

  lastMessageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  lastMessageSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    maxWidth: 180,

    [theme.breakpoints.down(768)]: {
      maxWidth: 160,
    },
  },

  nickName: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  lastMessageText: {
    margin: 0,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  lastMessageTextBold: {
    fontWeight: 600,
  },

  badge: {
    height: 18,
    width: 18,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // color: theme.palette.text.second,
    color: '#fff',
    fontSize: 12,
    lineHeight: '14px',
  },

  isReadIcon: {
    width: '18px !important',
    height: '18px !important',
    color: '#00B746',
  },

  noReadIcon: {
    width: '18px !important',
    height: '18px !important',
    color: theme.palette.text.second,
  },
}))

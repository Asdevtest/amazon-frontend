import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  chatItem: {
    borderRadius: '0px',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: '5px 10px',
    height: '60px',
    minHeight: '60px',
    width: '100%',
    gap: '10px',
  },

  activeChatItem: {
    backgroundColor: theme.palette.background.activeChat,
  },

  titleWrapper: {
    flex: '0 1 auto',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    alignItems: 'center',
  },

  text: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'start',
  },

  textTyping: {
    color: theme.palette.text.second,
  },

  title: {
    fontWeight: '600',
    fontSize: '16px',
  },

  lastMessageDate: {
    fontSize: '12px',
    color: theme.palette.text.second,
  },

  chatItemInfo: {
    overflow: 'hidden',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  lastMessageBlock: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  badge: {
    '.ant-badge-count': {
      background: theme.palette.primary.main,
    },
  },
}))

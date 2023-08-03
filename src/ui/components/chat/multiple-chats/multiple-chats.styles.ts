import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  chatsWrapper: {
    height: '100%',
    display: 'flex',
    borderRadius: 4,
    overflow: 'hidden',
    boxShadow: theme.palette.boxShadow.paper,
    background: theme.palette.background.general,

    [theme.breakpoints.down(768)]: {
      borderRadius: 7,
    },
  },

  hideChats: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  chats: {
    width: 310,

    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  chatWrapper: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  noSelectedChatIcon: {
    width: '100px !important',
    height: '92px !important',
    color: theme.palette.primary.main,
  },

  noChatTitle: {
    fontSize: 24,
    color: theme.palette.text.second,
    margin: '30px 0 10px',
  },

  noChatSubTitle: {
    fontSize: 18,
    color: theme.palette.text.general,
  },
}))

import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    flex: 1,
    display: 'flex',
    borderRadius: '4px',
    // boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    height: '100%',

    overflow: 'hidden',

    boxShadow: '0px 2px 10px 2px rgba(150, 150, 150, 0.15)',
    backgroundColor: theme.palette.background.main,
    [theme.breakpoints.down(768)]: {
      height: '100%',
      overflow: 'hidden',
    },
  },
  chatsWrapper: {
    width: '296px',
    height: '100%',
    [theme.breakpoints.down(768)]: {
      width: '100%',
      height: '100%',
    },
  },
  chatWrapper: {
    flex: 1,
    display: 'flex',
  },

  noChatWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  hideChatWrapper: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
  hideChatsWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
}))

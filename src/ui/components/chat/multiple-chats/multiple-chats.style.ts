import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    width: '100%',
    flex: 1,
    display: 'flex',
    borderRadius: '4px',
    // boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
    height: '100%',

    overflow: 'hidden',

    boxShadow: '0px 2px 10px 2px rgba(150, 150, 150, 0.15)',
    background: '#FFFFFF',
  },
  chatsWrapper: {
    width: '276px',
    height: '100vh',
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
    color: '#656565',
    margin: '30px 0 10px',
  },

  noChatSubTitle: {
    fontSize: 18,

    color: '#001029',
  },
  hideChatWrapper: {display: 'none'},
  hideChatsWrapper: {},
  '@media (max-width: 768px)': {
    chatsWrapper: {
      width: '100%',
      height: '100%',
    },

    hideChatWrapper: {
      display: 'none',
    },
    hideChatsWrapper: {display: 'none'},
    root: {
      height: '100%',
      overflow: 'hidden',
    },
  },
}))

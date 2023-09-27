import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  scrollViewWrapper: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'auto',
    padding: '4px 4px 0 0',
    background: theme.palette.background.general,
    borderRadius: '0 7px 0 0',

    [theme.breakpoints.down(768)]: {
      maxHeight: 'calc(100vh - 226px)',
      padding: 0,
      boxShadow: theme.palette.boxShadow.paper,
      borderRadius: 0,
    },
  },

  hideAndShowIconWrapper: {
    position: 'absolute',
    top: 20,
    right: 30,
    zIndex: 10,
    width: 40,
    height: 40,
    border: '1px solid #E0E0E0',
    backgroundColor: theme.palette.background.general,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    cursor: 'pointer',

    [theme.breakpoints.down(768)]: {
      top: 20,
      right: 10,
    },
  },

  scrollToBottom: {
    border: '1px solid #E0E0E0',
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 10,
    width: 40,
    height: 40,
    backgroundColor: theme.palette.background.general,
    boxShadow: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down(768)]: {
      bottom: 20,
      right: 10,
    },
  },

  scrollToBottomRight: {
    right: 400,
  },

  scrollToBottomBadge: {
    fontSize: 13,
    width: 25,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.primary.main,
    position: 'absolute',
    top: -10,
    right: -10,
    borderRadius: '50%',
    color: 'white',
  },

  bottomPartWrapper: {
    width: '100%',
    height: 'auto',
    background: theme.palette.background.general,
    padding: '20px 50px',
    borderRadius: '0 0 7px 0',

    [theme.breakpoints.down(1024)]: {
      padding: '20px 30px',
    },

    [theme.breakpoints.down(768)]: {
      padding: 10,
      boxShadow: theme.palette.boxShadow.paper,
      borderRadius: '0 0 7px 7px',
    },
  },

  inputWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    gap: 20,
  },

  input: {
    width: '100%',
    borderRadius: 7,
    backgroundColor: theme.palette.input.second,

    [theme.breakpoints.down(768)]: {
      '& > div': {
        padding: '8px 0 8px 8px',
        fontSize: 16,
        lineHeight: '22px',
      },
    },
  },

  sendBtnTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },

  sendBtnIcon: {
    width: '22px !important',
    height: '18px !important',
  },

  sendBtn: {
    height: 40,

    [theme.breakpoints.down(1024)]: {
      width: 40,
      height: 40,
      borderRadius: '50%',
    },
  },

  inputFilled: {
    background: theme.palette.input.second,
  },

  icons: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,

    [theme.breakpoints.down(768)]: {
      margin: '0 3px',
    },
  },

  inputIcon: {
    width: '38px !important',
    height: '38px !important',
    color: theme.palette.text.second,
    transition: '0.3s ease',
    cursor: 'pointer',

    '&:hover': {
      transform: 'scale(1.1)',
    },

    [theme.breakpoints.down(1024)]: {
      width: '24px !important',
      height: '24px !important',
    },
  },

  inputIconActive: {
    color: theme.palette.primary.main,
  },

  filesIconWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  badge: {
    position: 'absolute',
    top: -10,
    left: 55,
    height: 16,
    width: 16,
    backgroundColor: 'red',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 12,
  },

  emojisWrapper: {
    zIndex: 10,
    position: 'absolute',
    right: 65,
    bottom: 70,
    transform: 'translate(-50%, 0%)',

    'em-emoji-picker': {
      '--rgb-accent': theme.palette.primary.mainRgb,
    },

    [theme.breakpoints.down(1024)]: {
      right: 45,
      bottom: 90,
    },

    [theme.breakpoints.down(768)]: {
      right: 20,
      bottom: 80,
      transform: 'none',

      'em-emoji-picker': {
        width: 280,
      },
    },
  },

  sendBtnText: {
    [theme.breakpoints.down(1024)]: {
      display: 'none',
    },
  },

  arrowIcon: {
    color: theme.palette.primary.main,
  },

  hideArrow: {
    width: '15px !important',
    height: '15px !important',
  },

  collapseText: {
    color: theme.palette.primary.main,
    marginRight: 5,
  },

  pencilEditIcon: {
    transition: '.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  messageToReplyWrapper: {
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    position: 'relative',
    overflowY: 'auto',
    maxHeight: 300,
    display: 'flex',
    cursor: 'pointer',
  },

  messageToReplyIcon: {
    position: 'sticky',
    top: 20,
    margin: '0px 5px',
  },

  messageToReplyCloseIcon: {
    position: 'sticky',
    top: 20,
    marginLeft: 'auto',
    marginRight: 10,

    cursor: 'pointer',
    transition: '.3s ease',
    '&: hover': {
      transform: 'scale(1.1)',
    },
  },

  messageToReplySubWrapper: {},

  hideElement: {
    display: 'none',
  },
}))

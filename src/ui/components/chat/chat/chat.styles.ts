import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    paddingTop: 2,

    [theme.breakpoints.down(768)]: {
      padding: 0,
    },
  },

  opponentWrapper: {
    display: 'none',

    [theme.breakpoints.down(768)]: {
      display: 'flex',
      alignItems: 'center',

      gap: 20,
      background: theme.palette.background.general,
      padding: '15px 10px',
    },
  },

  arrowBackIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: theme.palette.background.second,
  },

  arrowBackIcon: {
    marginRight: 5,
    color: theme.palette.primary.main,
  },

  opponent: {
    [theme.breakpoints.down(768)]: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
  },

  avatar: {
    width: 40,
    height: 40,
  },

  opponentName: {
    maxWidth: 180,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    [theme.breakpoints.down(768)]: {
      maxWidth: 120,
      fontSize: 18,
      lineHeight: '25px',
      fontWeight: 600,
    },
  },

  isOnline: {
    display: 'none',

    [theme.breakpoints.down(768)]: {
      display: 'block',
      fontSize: 14,
      lineHeight: '19px',
      fontWeight: 600,
      color: theme.palette.text.second,
    },
  },

  soundIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },

  scrollViewWrapper: {
    position: 'relative',
    display: 'flex',
    minHeight: 1,

    [theme.breakpoints.down(768)]: {
      maxHeight: 'calc(100vh - 226px)',

      '&::-webkit-scrollbar': {
        width: 0,
      },
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
      display: 'none',
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
  },

  scrollToBottomRight: {
    right: 380,
  },

  scrollToBottomBadge: {
    padding: '1px 6px',
    background: theme.palette.primary.main,
    position: 'absolute',
    top: -10,
    right: -10,
    borderRadius: 20,
    color: 'white',
  },

  bottomPartWrapper: {
    backgroundColor: theme.palette.background.general,
    padding: '20px 50px',

    [theme.breakpoints.down(768)]: {
      padding: 10,
    },
  },

  endAdornment: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '100%',
    gap: 10,
    alignSelf: 'flex-end',
    position: 'relative',
    width: 80,
  },

  inputWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    gap: 20,
  },

  input: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: theme.palette.input.second,
  },

  sendBtnTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },

  sendBtnIcon: {
    width: 22,
    height: 17.5,
  },

  sendBtn: {
    height: 40,
    [theme.breakpoints.down(768)]: {
      width: 40,
      height: 40,
      borderRadius: '50%',
    },
  },

  inputFilled: {
    background: theme.palette.input.second,
  },

  inputIcon: {
    position: 'absolute',
    width: '38px !important',
    height: '38px !important',
    color: theme.palette.text.second,
    transition: '0.3s ease',
    cursor: 'pointer',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  inputIconActive: {
    color: theme.palette.primary.main,
  },

  emojiIconPos: {
    top: -30,
    left: -5,
  },

  fileIconPos: {
    top: -30,
    left: 32,

    [theme.breakpoints.down(768)]: {
      top: -30,
      left: 25,
    },
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

    [theme.breakpoints.down(768)]: {
      zIndex: 10,
      position: 'absolute',
      left: 'calc(100% - 270px)',
      right: 0,
      bottom: 70,
      transform: 'translate(-50%, 0%)',
    },
  },

  sendBtnText: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  arrowIcon: {
    // marginLeft: 8,
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
    // flexGrow: 1,
    // alignItems: 'flex-end',

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
}))

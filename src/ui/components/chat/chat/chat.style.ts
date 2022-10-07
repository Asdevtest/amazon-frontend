import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    height: '100%',
    paddingTop: 2,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  scrollViewWrapper: {
    width: '100%',

    // height: '556px',

    flex: 1,

    minHeight: 278,
    maxHeight: 690,
  },
  bottomPartWrapper: {
    backgroundColor: theme.palette.background.main,

    // height: '227px',
    // minHeight: 80,
    // maxHeight: 300,

    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    padding: '20px 70px',

    position: 'relative',
  },

  btnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  backBtn: {
    marginRight: '10px',
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
    // height: 40,
    borderRadius: 4,
    // backgroundColor: '#E0E0E0',

    backgroundColor: theme.palette.input.second,

    // padding: '5.5px 8px !important',
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
  },

  inputFilled: {
    // backgroundColor: '#FFF',

    backgroundColor: theme.palette.input.second,
  },

  inputIcon: {
    position: 'absolute',
    width: 38,
    height: 38,

    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  emojiIconPos: {
    top: -30,
    left: -5,
  },

  fileIconPos: {
    top: -30,
    left: 32,
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

    // top: 14,
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
    zIndex: 999,
    position: 'absolute',
    right: 65,
    bottom: 70,
    transform: 'translate(-50%, 0%)',
  },
  opponentWrapper: {display: 'none'},
  avatarWrapper: {},
  opponentName: {},
  opponentSubWrapper: {},
  backIcon: {},
  sendBtnText: {},

  '@media (max-width: 768px)': {
    opponentWrapper: {
      position: 'absolute',
      top: 0,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fafafa',
      height: '50px',
      padding: '0 20px',
      zIndex: 990,
      width: '100vw',
    },
    opponentSubWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },

    sendBtnText: {
      display: 'none',
    },
    sendBtn: {width: 40, height: 40, borderRadius: '50%'},
    bottomPartWrapper: {
      padding: '10px 40px 10px 10px',
      width: '100vw',
    },
    emojisWrapper: {
      zIndex: 999,
      position: 'absolute',
      left: 'calc(100% - 270px)',
      right: 0,
      bottom: 70,
      transform: 'translate(-50%, 0%)',
    },
    emojiIconPos: {
      top: -30,
      left: -5,
    },

    fileIconPos: {
      top: -30,
      left: 25,
    },
    root: {
      width: '100vw',
    },
  },
}))

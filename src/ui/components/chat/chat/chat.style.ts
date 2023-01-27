import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    height: '100%',
    paddingTop: 2,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    [theme.breakpoints.down(768)]: {
      width: '100vw',
    },
  },
  scrollViewWrapper: {
    width: '100%',
    flex: 1,
    minHeight: 278,
    maxHeight: 690,
    display: 'flex',
  },
  bottomPartWrapper: {
    backgroundColor: theme.palette.background.general,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '20px 70px',
    position: 'relative',
    [theme.breakpoints.down(768)]: {
      padding: '10px 40px 10px 10px',
      width: '100vw',
    },
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
    [theme.breakpoints.down(768)]: {
      width: 40,
      height: 40,
      borderRadius: '50%',
    },
  },

  inputFilled: {
    // backgroundColor: theme.palette.background.general,

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
    [theme.breakpoints.down(768)]: {
      top: -30,
      left: -5,
    },
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
    [theme.breakpoints.down(768)]: {
      zIndex: 999,
      position: 'absolute',
      left: 'calc(100% - 270px)',
      right: 0,
      bottom: 70,
      transform: 'translate(-50%, 0%)',
    },
  },
  opponentWrapper: {
    display: 'none',
    [theme.breakpoints.down(768)]: {
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
  },
  opponentSubWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
  },
  backIcon: {},
  sendBtnText: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  groupSettingsWrapper: {
    width: 350,
    background: theme.palette.background.general,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  hideAndShowIconWrapper: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1200,
    width: '40px',
    height: '40px',
    // backgroundColor: '#d1d1d1a8', // старый цвет
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 2px 40px 2px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    [theme.breakpoints.down(900)]: {
      display: 'none',
    },
  },
  hideAndShowIcon: {
    top: 20,
    right: 155,
    width: 'max-content',
    borderRadius: 20,
    padding: '0 10px',
  },
  arrowIcon: {
    // marginLeft: 8,
    color: theme.palette.primary.main,
  },

  collapseWrapper: {
    display: 'flex',
  },

  collapseText: {
    color: theme.palette.primary.main,
    marginRight: 5,
  },

  groupSettingsImageWrapper: {
    width: '100%',
    height: 180,
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    // background: 'black',
    padding: 10,
    marginBottom: 15,
  },

  groupSettingsImageShadow: {
    width: '100%',
    height: 180,
    background: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.4,
  },

  groupSettingsImage: {
    width: '100%',
    height: 180,
    position: 'absolute',
    top: 0,
    left: 0,
    objectFit: 'contain',
    objectPosition: 'center',
    // opacity: 0.6,
  },

  groupSettingsInfoWrapper: {
    zIndex: 99,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  groupSettingsInfo: {
    // marginLeft: 10,
  },

  groupSettingsInfoTitle: {
    fontWeight: 600,
    fontSize: 14,
    // color: theme.palette.text.general,
    color: '#fff',

    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: 200,
  },

  usersCount: {
    // marginLeft: 15,
    fontWeight: 400,
    fontSize: 14,
    color: '#E1E1E1',
  },

  pencilEditIcon: {
    transition: '.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  addMemberBtnWrapper: {
    display: 'flex',
  },

  addMemberBtnText: {
    color: '#fff',
    marginRight: 5,
  },

  membersWrapper: {
    marginTop: 30,
    width: '100%',
    height: 420,

    padding: '0 15px',

    overflow: 'auto',
  },

  avatarWrapper: {
    width: 30,
    height: 30,

    marginRight: 10,

    // cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    // transition: '.3s ease',

    // '&:hover': {
    //   transform: 'scale(1.01)',
    //   opacity: '0.8',
    // },
  },

  memberWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  memberInfo: {
    display: 'flex',
    alignItems: 'center',
  },

  opponentName: {
    maxWidth: 180,

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  ownerSign: {
    color: theme.palette.text.second,
    marginLeft: 5,
  },
}))

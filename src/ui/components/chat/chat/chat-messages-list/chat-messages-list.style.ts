import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    height: '100%',
    width: '100%',
    // padding: '20px 12px',
    // overflow: 'auto',
    backgroundColor: theme.palette.background.second,
    scrollBehavior: 'smooth',
  },
  messageWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'end',
    flexDirection: 'row-reverse',

    [theme.breakpoints.down(768)]: {
      width: '90%',
    },
  },

  messageWrapperIsIncomming: {
    flexDirection: 'row',
    alignItems: 'end',

    // backgroundColor: '#EBEBEB',
  },
  messageWrapperIsLastMessage: {
    marginBottom: 0,
  },
  messageWrapperisNotPersonal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageInner: {
    marginRight: '12px',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    position: 'relative',

    // backgroundColor: '#EBEBEB',
  },
  messageInnerContentWrapper: {
    overflow: 'hidden',
  },
  messageInnerIsIncomming: {
    marginRight: 0,
    marginLeft: '12px',
  },
  messageInnerIsNextMessageSameAuthor: {
    marginRight: '44px',
  },
  messageInnerIsNextMessageSameAuthorIsInclomming: {
    marginLeft: '44px',
  },
  messageAvatarWrapper: {
    height: '32px',
    width: '32px',
  },
  messageAvatarWrapperIsIncomming: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },

  timeText: {
    fontSize: '14px',
    textAlign: 'center',

    color: theme.palette.text.second,
  },

  timeTextWrapper: {
    // position: 'absolute',
    // bottom: '-30px',
    // left: 0,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  message: {
    marginTop: 10,
  },
  unReadMessage: {
    backgroundColor: 'rgba(0,0,0, .07)',
    borderRadius: 10,

    padding: 10,
  },

  icon: {
    marginRight: '13px',
    color: theme.palette.primary.main,
    height: 25,
    width: 25,
  },

  menuWrapper: {
    display: 'flex',
    justifyContent: 'start',
    width: '170px',
    padding: '13px 0 13px 33px',
    fontSize: 18,
    lineHeight: '140%',
    fontWeight: 400,
    color: theme.palette.text.general,
    backgroundColor: theme.palette.background.general,

    '&:hover': {
      // backgroundColor: '#CCE2FF',
      backgroundColor: theme.palette.background.second,
    },
    [theme.breakpoints.down(768)]: {
      display: 'flex',

      justifyContent: 'start',
      width: '161px',
      padding: '13px 0 13px 10px',
      fontSize: 16,
      lineHeight: '22px',
      fontWeight: 400,
      color: theme.palette.text.general,
      backgroundColor: theme.palette.background.general,

      '&:hover': {
        // backgroundColor: '#CCE2FF',
        backgroundColor: theme.palette.background.second,
      },
    },
  },

  menu: {
    width: '170px',
    marginTop: '0',
    // marginLeft: '85px',
    display: 'flex',

    color: 'red',

    [theme.breakpoints.down(768)]: {
      width: '161px',
      marginTop: -56,
      marginLeft: '16px',
      display: 'flex',
    },
  },

  list: {
    padding: 0,
  },
}))

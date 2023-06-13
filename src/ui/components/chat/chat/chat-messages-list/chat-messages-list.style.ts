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
    // position: 'relative',

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

  repleyWrapper: {
    display: 'flex',
    opacity: '0.7',
    transform: 'scale(0.97)',
    cursor: 'pointer',
  },

  repleyDivider: {
    margin: '8px 10px 16px',
    borderRight: `7px solid ${theme.palette.input.customBorder}`,
    backgroundColor: '#E0E0E0',
  },

  messageContent: {
    position: 'relative',

    '&:hover': {
      '.controlsOverlay': {
        display: 'flex',
      },
    },
  },

  controlsOverlay: {
    pointerEvents: 'none',
    display: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0,0,0, .1)',
    borderRadius: '20px',
    margin: '0 44px',
    justifyContent: 'flex-end',
  },

  controls: {
    backgroundColor: theme.palette.background.general,
    display: 'flex',
    gap: '16px',
    padding: '6px 16px',
    height: 'fit-content',
    pointerEvents: 'all',
    borderRadius: '8px',

    button: {
      all: 'unset',
      cursor: 'pointer',
    },

    svg: {
      width: 18,
    },
  },
}))

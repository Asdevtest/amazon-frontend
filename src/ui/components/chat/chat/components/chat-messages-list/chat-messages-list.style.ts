import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  messagesWrapper: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 20,
    backgroundColor: theme.palette.background.second,

    [theme.breakpoints.down(1024)]: {
      padding: 10,
    },
  },

  messagesWrapperNone: {
    [theme.breakpoints.down(1024)]: {
      display: 'none',
    },
  },

  message: {},

  unReadMessage: {
    backgroundColor: 'rgba(0,0,0, .07)',
    borderRadius: 10,
  },

  timeTextWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  timeText: {
    fontSize: '14px',
    textAlign: 'center',
    color: theme.palette.text.second,
  },

  messageContent: {
    position: 'relative',

    '&:hover': {
      '.controlsOverlay': {
        display: 'flex',
      },
    },
  },

  highlightMessage: {
    background: theme.palette.background.activeChat,
    borderRadius: '8px',
  },

  messageWrapper: {
    minHeight: '20px',
    width: '100%',
    display: 'flex',
    alignItems: 'end',
    flexDirection: 'row-reverse',
    gap: 10,
  },

  messageWrapperIsIncomming: {
    flexDirection: 'row',
    alignItems: 'end',
    gap: 10,
  },

  messageWrapperisNotPersonal: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  messageInnerWrapper: {
    width: '100%',
  },

  messageInnerContentWrapper: {
    overflow: 'hidden',
  },

  messageInnerIsNextMessageSameAuthor: {
    marginRight: 42,

    [theme.breakpoints.down(768)]: {
      marginRight: 0,
    },
  },

  messageInnerIsNextMessageSameAuthorIsInclomming: {
    marginLeft: 42,

    [theme.breakpoints.down(768)]: {
      marginLeft: 0,
    },
  },

  messageAvatarWrapper: {
    height: '32px',
    width: '32px',
  },

  messageAvatarWrapperIsIncomming: {
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },

  icon: {
    marginRight: '13px',
    color: theme.palette.primary.main,
    height: 25,
    width: 25,
  },

  repleyWrapper: {
    marginBottom: 5,
    display: 'flex',
    transform: 'scale(0.97)',
    cursor: 'pointer',
  },

  repleyDivider: {
    margin: '8px 10px 16px',
    borderRight: `7px solid ${theme.palette.input.customBorder}`,
    backgroundColor: '#E0E0E0',

    [theme.breakpoints.down(768)]: {
      margin: 5,
    },
  },

  list: {
    flex: 1,
    '& > div': {
      padding: '10px',
      '& > div': {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      },
    },
  },
}))

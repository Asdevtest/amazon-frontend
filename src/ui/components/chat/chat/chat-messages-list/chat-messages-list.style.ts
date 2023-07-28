import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  messagesWrapper: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 20,
    backgroundColor: theme.palette.background.second,

    [theme.breakpoints.down(768)]: {
      '&::-webkit-scrollbar': {
        width: 0,
      },
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

  messageWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'end',
    flexDirection: 'row-reverse',
  },

  messageWrapperIsIncomming: {
    flexDirection: 'row',
    alignItems: 'end',
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
}))

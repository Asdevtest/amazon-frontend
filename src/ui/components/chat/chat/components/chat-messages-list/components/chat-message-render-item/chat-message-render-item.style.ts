import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
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

  messageInnerWrapper: {
    width: '100%',
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

  messageInnerContentWrapper: {
    overflow: 'hidden',
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
}))

import {tooltipClasses} from '@mui/material/Tooltip'

import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    height: '100%',
    backgroundColor: '#EBEBEB',
  },
  messageWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '30px',
    flexDirection: 'row-reverse',
  },
  messageWrapperIsNextMessageSameAuthor: {
    marginBottom: '15px',
  },
  messageWrapperIsIncomming: {
    flexDirection: 'row',
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
    maxWidth: '80%',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    position: 'relative',
    minWidth: '50%',
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
  messageAvatarWrapperIsIncomming: {},
  timeText: {
    fontSize: '10px',
    textAlign: 'center',
  },
  linkText: {
    fontSize: '10px',
    textAlign: 'center',
    overflow: 'auto',
    maxHeight: '40px',
    maxWidth: '200px',
    whiteSpace: 'nowrap',
  },
  timeTextWrapper: {
    position: 'absolute',
    bottom: '-15px',
    left: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipWrapper: {
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  tooltipImg: {
    width: '300px',
    height: '200px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  imgTooltip: {
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 450,
    },
  },

  image: {
    marginLeft: '20px',
    width: '80px',
    height: '70px',
    objectFit: 'contain',
    objectPosition: 'center',
    transition: '.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  imageWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
  },

  filesWrapper: {
    display: 'flex',
    maxWidth: '600px',
  },
}))

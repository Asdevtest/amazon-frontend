import {tooltipClasses} from '@mui/material/Tooltip'

import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',

    backgroundColor: '#EBEBEB',
  },
  messageWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '30px',
    flexDirection: 'row-reverse',
    // justifyContent: 'flex-end',
  },
  messageWrapperIsNextMessageSameAuthor: {
    marginBottom: '15px',
  },
  messageWrapperIsIncomming: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
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
    marginBottom: '40px',
    // maxWidth: '80%',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    position: 'relative',
    // minWidth: '50%',
    // width: '90%',
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
    fontSize: '14px',
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
    // position: 'absolute',
    // bottom: '-30px',
    // left: 0,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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

  filesTitle: {marginBottom: 10},

  filesMainWrapper: {
    backgroundColor: '#FCFCFC',
    padding: '14px 10px',
    borderRadius: '4px',
  },

  filesWrapper: {
    display: 'flex',
    maxWidth: '500px',
  },
}))

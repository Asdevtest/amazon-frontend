import {tooltipClasses} from '@mui/material/Tooltip'

import {makeStyles} from 'tss-react/mui'

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

  messageWrapperIsNextMessageSameAuthor: {
    // marginBottom: '40px',
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
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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

  message: {
    marginTop: 30,
  },
  unReadMessage: {
    backgroundColor: 'rgba(0,0,0, .07)',
    borderRadius: 10,

    padding: 10,
  },
  // '@media (max-width: 768px)': {
  //   messageWrapper: {
  //     width: '90%',
  //   },
  // },
}))

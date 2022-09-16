import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  linkText: {
    color: '#007BFF',
    fontSize: '16px',
    lineHeight: '140%',
    fontWeight: '400',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },

  blackLinkText: {
    color: '#001029',
    fontSize: '16px',
    lineHeight: '140%',
    fontWeight: '600',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease',
    maxWidth: '100px',
    textAlign: 'end',
    whiteSpace: 'pre-wrap',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },

  avatarWrapper: {
    marginRight: 10,

    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },

  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}))

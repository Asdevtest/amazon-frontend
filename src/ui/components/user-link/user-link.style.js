import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  linkText: {
    color: '#007BFF',
    fontSize: '16px',
    lineHeight: '140%',
    fontWeight: '400',
    cursor: 'pointer',
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
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },
}))

import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  balanceWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
  },

  balanceTitle: {
    fontSize: 36,
    lineHeight: '49px',
    // color: '#001029',

    color: theme.palette.text.general,
  },

  balanceFreeze: {
    fontSize: '36px',
    lineHeight: '49px',
    color: '#c4c4c4',
    marginLeft: 28,
  },

  title: {
    fontSize: 18,
    // color: '#001029',
    lineHeight: '140%',
    marginBottom: '16px',

    color: theme.palette.text.general,
  },
  '@media (max-width: 768px)': {
    balanceTitle: {
      fontSize: 18,
      lineHeight: '140%',
      color: '#001029',
    },
    title: {
      fontSize: 12,
      color: '#001029',
      lineHeight: '16px',
      marginBottom: '16px',
    },
  },
}))

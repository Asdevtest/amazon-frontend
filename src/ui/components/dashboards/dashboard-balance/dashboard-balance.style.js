import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  balanceWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '15px',
  },

  balanceTitle: {
    fontSize: 36,
    lineHeight: '49px',
    // color: theme.palette.text.primary,

    color: theme.palette.text.primary,
    [theme.breakpoints.down(768)]: {
      fontSize: 18,
      lineHeight: '140%',
      color: theme.palette.text.primary,
    },
  },

  balanceFreeze: {
    fontSize: '36px',
    lineHeight: '49px',
    color: '#c4c4c4',
    marginLeft: 28,
  },

  title: {
    fontSize: 18,
    // color: theme.palette.text.primary,
    lineHeight: '140%',
    marginBottom: '3px',

    color: theme.palette.text.primary,
    [theme.breakpoints.down(768)]: {
      fontSize: 12,
      color: theme.palette.text.primary,
      lineHeight: '16px',
    },
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  breadCrumbsWrapper: {
    padding: '10px 30px',

    [theme.breakpoints.down(1024)]: {
      padding: 5,
    },
  },

  lastCrumb: {
    color: theme.palette.text.general,
    fontSize: 16,

    [theme.breakpoints.down(1024)]: {
      fontSize: 14,
    },
  },

  crumb: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      textDecoration: 'underline',
    },

    [theme.breakpoints.down(1024)]: {
      fontSize: 14,
    },
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  breadCrumbsWrapper: {
    padding: '10px 30px',
  },

  lastCrumb: {
    color: theme.palette.text.general,
    fontSize: 16,

    [theme.breakpoints.down(768)]: {
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

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
    },
  },
}))

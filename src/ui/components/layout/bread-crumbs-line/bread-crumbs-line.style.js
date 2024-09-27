import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  breadCrumbsWrapper: {
    padding: '10px 30px',
  },

  lastCrumb: {
    color: theme.palette.text.general,
    fontSize: 16,
  },

  crumb: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

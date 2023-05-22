import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  lastCrumb: {
    color: theme.palette.text.general,
    fontSize: 16,
    [theme.breakpoints.down(768)]: {
      fontSize: '14px !important',
    },
  },

  сrumb: {
    color: theme.palette.primary.main,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease',

    '&:hover': {
      textDecoration: 'underline',
    },
    [theme.breakpoints.down(768)]: {
      fontSize: '14px !important',
    },
  },
}))

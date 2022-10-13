import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  lastCrumb: {
    color: theme.palette.text.general,
    fontSize: 18,
  },

  сrumb: {
    color: theme.palette.primary.main,
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease',

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  '@media (max-width: 768px)': {
    сrumb: {
      fontSize: '14px !important',
    },
    lastCrumb: {
      fontSize: '14px !important',
    },
  },
}))

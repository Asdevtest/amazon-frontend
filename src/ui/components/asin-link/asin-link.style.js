/* eslint-disable no-unused-vars */
import {makeStyles} from 'tss-react/mui'

//

export const useClassNames = makeStyles()(theme => ({
  copyAsin: {
    display: 'flex',
    gap: 5,
  },
  normalizeLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    transition: '.3s ease',
    '&:hover': {
      opacity: '.7',
    },
  },
  linkSpan: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    // color: theme.palette.text.main,
  },
  missingSpan: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',

    color: theme.palette.text.second,
  },
}))

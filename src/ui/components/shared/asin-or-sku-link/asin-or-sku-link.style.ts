/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  copyAsin: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  normalizeLink: {
    textDecoration: 'none',
    transition: '.3s ease',
    '&:hover': {
      opacity: '.7',
    },
  },
  linkSpan: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
  },
  missingSpan: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',
    color: theme.palette.text.second,
  },
}))

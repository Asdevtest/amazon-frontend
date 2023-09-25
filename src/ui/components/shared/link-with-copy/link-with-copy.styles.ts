import { makeStyles } from 'tss-react/mui'

export const useLinkWithCopyStyles = makeStyles()(theme => ({
  normalizeLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    transition: '.3s ease',
    fontSize: '14px',
    lineHeight: '19px',

    '&:hover': {
      opacity: '.7',
    },
  },

  linkSpan: {
    color: theme.palette.primary.main,
    fontSize: '14px',
    lineHeight: '19px',
  },

  wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    gap: 5,
  },
}))

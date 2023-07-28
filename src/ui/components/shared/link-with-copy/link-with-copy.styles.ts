import { makeStyles } from 'tss-react/mui'

export const useLinkWithCopyStyles = makeStyles()(theme => ({
  normalizeLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    transition: '.3s ease',
    fontSize: '14px',
    lineHeight: '21px',

    '&:hover': {
      opacity: '.7',
    },
  },

  linkSpan: {
    color: theme.palette.primary.main,
    fontSize: '14px',
    lineHeight: '21px',
  },

  wrapper: {
    width: '100%',
    display: 'flex',
    gap: 5,
    alignItems: 'center',
  },
}))

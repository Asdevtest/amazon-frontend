import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  normalizeLink: {
    textDecoration: 'none',
    transition: '.3s ease',

    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.primary.main,
    '&:hover': {
      opacity: '.7',
    },
  },

  mediumSizeLinkText: {
    fontSize: '16px',
  },

  wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    gap: 5,
  },
}))

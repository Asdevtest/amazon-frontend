import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
  },

  title: {
    color: theme.palette.text.second,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    transition: '.3s ease',
    opacity: 1,

    '&:hover': {
      opacity: 0.8,
    },
  },

  missingText: {
    color: theme.palette.text.general,

    '&:hover': {
      opacity: 1,
    },
  },
}))

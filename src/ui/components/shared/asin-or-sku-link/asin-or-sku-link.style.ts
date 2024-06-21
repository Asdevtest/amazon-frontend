import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,

    fontSize: 14,
    lineHeight: '19px',
  },

  title: {
    color: theme.palette.text.second,
  },

  text: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.general,
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
}))

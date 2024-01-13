import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 250,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  title: {
    fontWeight: 600,
  },

  cardsWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  commentCard: {
    gap: 0,
  },

  field: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  fieldText: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,

    '&:hover': {
      opacity: 1,
    },
  },

  commentEditor: {
    minHeight: 64,
    height: '64px !important',
    fontSize: 12,
    lineHeight: '16px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
  },

  commentTitle: {
    fontWeight: 500,
    color: theme.palette.text.general,
  },

  commentText: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.general,
  },

  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    height: 16,
    display: 'flex',
    justifyContent: 'flex-end',
  },

  link: {
    color: theme.palette.primary.main,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },
  },
}))

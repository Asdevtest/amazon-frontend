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
    gap: 8,
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

  editorWrapper: {
    margin: 0,
  },

  editor: {
    padding: 0,
    border: 'none',
    borderRadius: 0,
    background: 'none !important',
    minHeight: 48,
    height: 48,
    fontSize: 12,
    lineHeight: '16px',
    overflow: 'hidden !important',
    display: '-webkit-box',
    WebkitLineClamp: 3,
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
    display: 'flex',
    justifyContent: 'flex-end',
  },

  button: {
    height: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  link: {
    color: theme.palette.primary.main,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },
  },

  pencilIcon: {
    height: '16px !important',
    width: '16px !important',
  },
}))

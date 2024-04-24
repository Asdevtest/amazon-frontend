import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: 250,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  title: {
    fontWeight: 600,
  },

  titleIcon: {
    height: '16px !important',
    width: '16px !important',
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
    marginBottom: '0 !important',
  },

  editor: {
    height: 48,
    padding: '0 !important',
    fontSize: 12,
    lineHeight: '16px',
    background: `${theme.palette.background.general} !important`,

    textarea: {
      padding: '0 !important',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      background: `${theme.palette.background.general} !important`,

      '&:disabled': {
        '-webkit-text-fill-color': theme.palette.text.general,
      },
    },
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

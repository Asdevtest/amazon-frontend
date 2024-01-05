import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    gap: 15,
  },

  mainInfoBlockWrapper: {
    width: '100%',
    maxWidth: 280,
  },

  additionalInfoBlockWrapper: {
    width: '100%',
    maxWidth: 300,
  },

  photosInfoBlockWrapper: {
    width: '100%',
    maxWidth: 210,
  },

  commentsInfoBlockWrapper: {
    width: '100%',
    maxWidth: 250,
  },

  infoBlock: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
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

  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  switcher: {
    display: 'flex',
    justifyContent: 'flex-end',
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
  },

  fieldTextMedium: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 500,
  },

  cardComment: {
    gap: 0,
  },

  comment: {
    height: 32,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',

    display: '-webkit-box',
    WebkitLineClamp: 2,
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

  fieldButtonContainer: {
    height: 16,
    display: 'flex',
    justifyContent: 'flex-end',
  },

  fieldIconButton: {
    width: 24,
    height: 24,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },
  },

  link: {
    color: theme.palette.primary.main,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },
  },

  userMiniCellWrapper: {
    padding: 0,
  },

  userMiniCellAvatar: {
    width: 19,
    height: 19,
  },

  eyeButton: {
    width: 24,
    height: 24,
  },

  eyeIcon: {
    color: theme.palette.primary.main,
  },

  tafiffButton: {
    width: 115,
    background: theme.palette.primary.main,
    padding: '2px 2px',
    color: '#fff',
    borderRadius: 6,
    boxShadow: '0 0 5px 3px rgba(0, 0, 0, 0.17)',
    opacity: 1,
    transition: '.3s ease-in-out',

    span: {
      maxWidth: '90%',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
    },

    '&:hover': {
      opacity: 0.8,
    },

    '&:active': {
      boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
    },

    '&:disabled': {
      opacity: 0.5,
    },
  },
}))

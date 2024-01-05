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

  comment: {
    height: 38,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',

    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },

  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fieldButtonContainer: {
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
}))

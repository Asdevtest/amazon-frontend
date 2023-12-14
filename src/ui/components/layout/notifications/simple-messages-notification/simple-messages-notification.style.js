import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
  },

  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },

  message: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.general,
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },

  files: {
    display: 'flex',
    gap: 5,
  },

  date: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.second,
  },

  dateContainer: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },

  noticeTitle: {
    color: theme.palette.primary.main,
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: '400',
  },
}))

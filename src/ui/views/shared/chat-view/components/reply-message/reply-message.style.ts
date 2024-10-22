import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  replyMessageWrapper: {
    padding: '10px',
    flex: 1,
    display: 'flex',
    gap: '10px',
  },

  replyMessageContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  img: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
  },

  icon: {
    color: theme.palette.primary.main,
  },

  replyText: {
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  replyMessageText: {
    fontSize: 14,
    color: theme.palette.text.second,
  },
}))

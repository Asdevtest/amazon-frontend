import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  forwardMessagesWrapper: {
    padding: '10px',
    flex: 1,
    display: 'flex',
    gap: '10px',
  },

  forwardMessages: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  icon: {
    color: theme.palette.primary.main,
  },

  forwardMessagesUsers: {
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  forwardMessagesCount: {
    fontSize: 14,
    color: theme.palette.text.second,
  },
}))

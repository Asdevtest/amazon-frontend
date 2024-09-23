import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  forwardMessagesWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    backgroundColor: theme.palette.background.general,
  },

  icon: {
    color: theme.palette.primary.main,
  },

  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  forwardMessages: {
    width: '100%',
  },

  fileList: {
    '& > div': {
      maxHeight: '240px',
      height: '100%',
      overflow: 'auto',
      width: 'max-content',
      paddingRight: '10px',
    },
  },

  forwardMessagesUsers: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  message: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    maxWidth: '60vw',
    height: '100%',
    fontSize: '18px',
    fontWeight: '400',
  },
}))

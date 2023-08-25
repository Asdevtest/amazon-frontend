import { makeStyles } from 'tss-react/mui'

export const useChatCurrentReplyMessageStyles = makeStyles()(theme => ({
  body: {
    width: '100%',
    padding: '20px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 85,
    background: theme.palette.background.general,
    borderBottom: `1px solid ${theme.palette.background.second}`,

    [theme.breakpoints.down(1024)]: {
      padding: 10,
    },
  },

  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '5px 20px',
    borderLeft: `2px solid ${theme.palette.primary.main}`,
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

  controls: {
    display: 'flex',
    gap: '15px',
  },

  replyIcon: {
    color: theme.palette.primary.main,
    width: '18px !important',
    height: '18px !important',
  },

  icon: {
    cursor: 'pointer',
  },
}))

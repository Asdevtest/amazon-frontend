import { makeStyles } from 'tss-react/mui'

export const useChatCurrentReplyMessageStyles = makeStyles()(theme => ({
  body: {
    borderLeft: `1px solid ${theme.palette.primary.main}`,
    display: 'flex',
    gap: '85px',
    justifyContent: 'space-between',
    margin: '10px',
    padding: '0 50px 0 10px',
    width: '100%',
  },

  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
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

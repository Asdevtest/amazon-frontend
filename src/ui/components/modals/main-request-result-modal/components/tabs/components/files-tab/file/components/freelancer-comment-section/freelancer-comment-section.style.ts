import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  fileName: {
    width: 109,
    fontSize: 14,
    lineHeight: '19px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'default',
  },

  commenButton: {
    padding: '2px 0',
    width: 109,
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    overflow: 'hidden',
  },

  commentText: {
    fontSize: '12px',
    lineHeight: '16px',
    color: theme.palette.primary.main,
  },

  notCommentText: {
    fontSize: '12px',
    lineHeight: '20px',
  },

  icon: {
    width: '16px !important',
    height: '16px !important',
    color: theme.palette.primary.main,
  },
}))

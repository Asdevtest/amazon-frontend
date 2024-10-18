import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  replyMessageWrapper: {
    padding: '10px',
    flex: 1,
    display: 'flex',
    gap: '10px',
  },
}))

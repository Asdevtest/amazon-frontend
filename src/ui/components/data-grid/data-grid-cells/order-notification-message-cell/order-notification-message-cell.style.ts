import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  notificationId: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
}))

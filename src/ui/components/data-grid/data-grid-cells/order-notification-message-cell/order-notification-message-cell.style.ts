import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  notificationId: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },

  clockIcon: {
    fontSize: 16,
    color: theme.palette.primary.main,
    stroke: '#fff',
  },

  orderNotification: {
    display: 'flex',
    gap: 3,
    alignItems: 'center',
  },
}))

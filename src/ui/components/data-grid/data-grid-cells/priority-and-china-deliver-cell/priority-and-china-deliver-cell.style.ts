import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  priorityAndChinaDeliveryWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    height: '100%',
  },

  clockIcon: {
    color: theme.palette.primary.main,
  },

  priorityAndChinaDelivery: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
}))

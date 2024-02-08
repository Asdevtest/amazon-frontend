import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  paymentMethods: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 5,
  },

  paymentMethod: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
  },

  paymentMethodIcon: {
    width: 19,
    height: 19,
    borderRadius: '50%',
  },

  paymentMethodTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },
}))

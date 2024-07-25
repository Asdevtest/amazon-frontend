import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    padding: '10px 0',
  },

  paymentMethods: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 5,
    maxHeight: '58px',
    overflow: 'auto',
  },

  paymentMethod: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
  },

  paymentMethodIcon: {
    width: 16,
    height: 16,
    borderRadius: '50%',
  },

  paymentMethodTitle: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.primary.main,
  },
}))

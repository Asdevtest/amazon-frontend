import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 400,
    padding: '0 5px',
  },

  paymentMethodTitleWrapper: {
    marginLeft: -12,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  paymentMethodIcon: {
    width: 19,
    height: 19,
    borderRadius: '50%',
  },

  paymentMethodTitle: {
    fontSize: 14,
    lineHeight: '19px',
  },

  commentInput: {
    height: 130,

    textarea: {
      padding: '5px 10px',
    },
  },

  label: {
    marginBottom: '5px !important',
    color: theme.palette.text.secondary,
  },

  notActiceCard: {
    filter: 'blur(2px)',
    opacity: '0.3',
    pointerEvents: 'none',
  },

  imageFileInputWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

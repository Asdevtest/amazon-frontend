import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
  },

  select: {
    minHeight: '40px !important',
    padding: '0 !important',
  },

  selectIsNotEmpty: {
    padding: '0 50px 0 20px !important',
  },

  paymentMethodsLabel: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
    whiteSpace: 'nowrap',
    color: theme.palette.text.general,
    margin: '0 !important',
  },

  paymentMethodsContainer: {
    display: 'flex',
    gap: 20,
    margin: 0,
  },

  rowPaymentMethodsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  paymentMethodsField: {
    position: 'relative',
    minWidth: 140,
    width: 'fit-content',
    minHeight: 40,
    borderRadius: '25px',
    border: `1px solid ${theme.palette.primary.main}`,

    '&:before': {
      content: 'none',
    },
  },

  grayBorder: {
    border: `1px solid ${theme.palette.input.customBorder}`,
  },

  paymentMethodsPlaceholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'pre-wrap',
    gap: 30,
    height: 40,
  },

  placeholderText: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  addIcon: {
    width: 13,
    height: 13,
    color: theme.palette.primary.main,
  },

  generalText: {
    '&.Mui-disabled': {
      WebkitTextFillColor: `${theme.palette.primary.main} !important`,
    },
  },

  cursorPointer: {
    cursor: 'pointer !important',
  },

  editIcon: {
    position: 'absolute',
    right: 25,
    width: '13px !important',
    height: '13px !important',
    color: theme.palette.primary.main,
  },

  paymentMethods: {
    minHeight: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 5,
    padding: '5px 0',
  },

  paymentMethod: {
    display: 'flex',
    alignItems: 'center',
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
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
  },

  select: {
    padding: '0 !important',
  },
  selectIsNotEmpty: {
    padding: '10px 73px 10px 15px !important',
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
    gap: 30,
  },

  rowPaymentMethodsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  paymentMethodsField: {
    position: 'relative',

    minWidth: 240,
    width: '100%',
    minHeight: 40,
    borderRadius: 4,

    border: `1px solid ${theme.palette.primary.main}`,

    '&:before': {
      content: 'none',
    },
  },

  grayBorder: {
    border: `1px solid ${theme.palette.input.customBorder}`,
  },

  paymentMethodsPlaccholder: {
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

  selectedItemText: {
    textAlign: 'center',

    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.primary.main,
  },

  generalText: {
    '&.Mui-disabled': {
      WebkitTextFillColor: `${theme.palette.primary.main} !important`,
    },
  },

  cursorPointer: {
    cursor: 'pointer',
  },

  editIcon: {
    position: 'absolute',
    right: 25,

    width: '13px !important',
    height: '13px !important',

    color: theme.palette.primary.main,
  },
}))

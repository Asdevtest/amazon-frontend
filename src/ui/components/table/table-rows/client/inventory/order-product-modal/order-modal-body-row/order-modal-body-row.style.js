import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  noCurrentSupplier: {
    boxShadow: 'inset 0 0 15px rgba(255, 79, 7, .8)',
  },

  commentInput: {
    height: 70,
    padding: '10px 0',
  },

  inputMultiline: {
    height: '60px !important',
    padding: '0 10px',
    fontSize: 16,
    lineHeight: '20px',
  },

  row: {
    width: '100%',
    border: '1px solid rgba(0,0,0, .1)',
  },

  sumsWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    gap: '20px',
  },
  mainCheckboxWrapper: {
    width: '100%',
  },
  checkboxWrapper: {
    display: 'flex',
  },
  expressWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 20,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  deliveryImg: {
    marginLeft: 10,
  },

  containerField: {
    margin: '0 !important',
    width: 'auto',
  },

  labelField: {
    fontSize: '14px',
    color: theme.palette.text.general,
    lineHeight: '17px',
    fontWeight: '600',
    marginRight: '10px',
    whiteSpace: 'nowrap',
  },

  sumText: {
    fontSize: '14px',
    color: theme.palette.text.general,
    lineHeight: '16px',
    fontWeight: '400',
    whiteSpace: 'nowrap',
  },

  cell: {
    padding: '0 5px',
  },

  productCell: {
    maxWidth: 260,
  },

  deleteCell: {
    padding: '0',
  },

  errorSpace: {
    marginTop: 12,
  },

  priceVariationsCell: {
    width: 145,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    margin: 'auto',
    color: theme.palette.text.general,
    fontSize: '12px',
  },

  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    padding: '5px 0',
  },

  warningText: {
    fontSize: '12px',
    color: theme.palette.text.red,
  },

  textSuccess: {
    fontSize: '12px',
    color: theme.palette.text.green,
  },

  inputQuantity: {
    '.ant-input-suffix >*:not(:last-child)': {
      marginRight: '5px',
    },
  },

  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  boxGray: {
    color: ' #637381CC',
  },

  tariffText: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '3px',
    span: {
      maxWidth: '100px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
}))

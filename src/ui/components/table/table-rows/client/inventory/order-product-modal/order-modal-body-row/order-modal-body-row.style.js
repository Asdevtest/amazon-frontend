import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  warningText: {
    fontSize: '12px',
    color: theme.palette.text.red,
  },

  textSuccess: {
    fontSize: '12px',
    color: theme.palette.text.green,
  },

  row: {
    width: '100%',

    td: {
      color: theme.palette.text.general,
    },
  },

  noCurrentSupplier: {
    boxShadow: 'inset 0 0 15px rgba(255, 79, 7, .8)',
  },

  cell: {
    padding: '0 5px',
  },

  productCell: {
    maxWidth: 220,
  },

  commentInput: {
    height: 70,
    padding: '5px 0',
  },

  inputMultiline: {
    height: '60px !important',
    padding: '0 10px',
    fontSize: 16,
    lineHeight: '20px',
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
    color: theme.palette.text.general,
    fontSize: '14px',
    lineHeight: '17px',
    fontWeight: '600',
    marginRight: '10px',
    whiteSpace: 'nowrap',
  },

  sumText: {
    color: theme.palette.text.general,
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    whiteSpace: 'nowrap',
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    padding: '5px 0',
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

  minBatchWrapper: {
    position: 'relative',
  },

  tooltipWrapper: {
    position: 'absolute',
    top: '-10px',
    right: '-15px',
    cursor: 'pointer',
    width: '18px',
    height: '18px',
    zIndex: '20',
  },

  warningIcon: {
    color: 'red',
  },

  inputCell: {
    width: '210px',
  },
}))

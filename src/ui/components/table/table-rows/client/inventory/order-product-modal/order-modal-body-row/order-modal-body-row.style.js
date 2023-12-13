import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  img: {
    height: '64px',
    width: '64px',
    borderRadius: '2px',
    verticalAlign: 'middle',
    margin: '0 16px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  asinCell: {
    padding: '12px 0px',
    height: '88px',
    scope: 'row',
  },
  asinCellContainer: {
    display: 'inline-flex',
  },

  barcodeChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '14px',
    width: '90px',
    borderRadius: '7px',
    height: '36px',
  },
  barcodeChipHover: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  barcodeChipIcon: {
    color: 'rgba(255,255,255,0.26)',
    '&:hover, &:focus': {
      color: 'rgba(255,255,255,0.46)',
    },
  },
  barcodeChipExists: {
    backgroundcolor: theme.palette.text.general,
  },
  amountCell: {
    width: '90px',
  },

  noCurrentSupplier: {
    boxShadow: 'inset 0 0 15px rgba(255, 79, 7, .8)',
  },

  noCurrentSupplierText: {
    color: 'red',
  },

  storekeeperBtn: {
    width: '100%',
    height: '32px',
  },

  datePickerWrapper: {
    width: 150,
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

  amazonTitle: {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    maxHeight: 65,
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    marginBottom: '5px',
    color: theme.palette.text.general,
  },

  standartText: {
    color: `${theme.palette.text.general} !important`,
  },

  row: {
    width: '100%',
    border: '1px solid rgba(0,0,0, .1)',
  },

  sumsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 0',
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
    marginLeft: 22,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  deliveryImg: {
    marginLeft: 10,
  },

  containerField: {
    width: 'max-content !important',
    margin: '0 !important',
  },

  batchWeight: {
    width: '190px !important',
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

  error: {
    lineHeight: 0,
    fontSize: 12,
    color: '#FF1616',
    marginTop: 12,
  },

  errorSpace: {
    marginTop: 12,
  },

  errorSpaceInputCell: {
    marginTop: 18,
  },

  priceVariationsCell: {
    minWidth: 130,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    margin: 'auto',
    color: theme.palette.text.general,
    fontSize: '12px',
  },

  calculationButton: {
    minWidth: '225px !important',
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
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 400,
    color: theme.palette.text.red,
  },
}))

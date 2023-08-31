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
    borderRadius: '4px',
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
    height: '70px',
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
    width: 'min-content',
    margin: 0,
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
    padding: '0 20px',
  },

  copyValueWrapper: {
    display: 'flex',
    gap: '10px',
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
}))

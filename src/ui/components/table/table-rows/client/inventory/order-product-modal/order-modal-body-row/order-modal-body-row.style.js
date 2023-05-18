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
  chip: {
    height: '20px',
    color: theme.palette.text.general,
    backgroundColor: 'rgba(240, 242, 244, 1)',
    fontSize: '12px',
  },
  indexCell: {
    fontSize: '13px',
    lineHeight: '15px',
    color: 'rgba(189, 194, 209, 1)',
    textAlign: 'center',
  },
  asinCell: {
    padding: '12px 0px',
    height: '88px',
    scope: 'row',
  },
  asinCellContainer: {
    display: 'inline-flex',
  },
  csCodeTypo: {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    width: '250px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  typoCell: {
    fontSize: '14px',
    lineHeight: '21px',
    // color: 'rgba(189, 194, 209, 1)',
  },
  typoSpan: {
    color: theme.palette.text.general,
  },
  cellBtn: {
    color: 'rgba(0, 123, 255, 1)',
    paddingTop: '0px',
    paddingBottom: '0px',
    textTransform: 'none',
  },
  priceTableCell: {
    textAlign: 'right',
  },
  feesTableCell: {
    textAlign: 'left',
  },
  rankTableCell: {
    textAlign: 'right',
  },
  ratingTableCell: {
    textAlign: 'right',
  },
  ratingTableCellContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  ratingTypo: {
    fontWeight: 500,
    marginRight: '6px',
  },
  rankCount: {
    display: 'flex',
    paddingBottom: '2px',
  },
  rankTypoReviews: {
    color: 'rgb(189, 194, 209)',
    whiteSpace: 'nowrap',
    textAlign: 'left',
  },
  salesCell: {
    textAlign: 'right',
  },
  salersTotal: {
    textAlign: 'center',
  },
  typoTableCell: {
    textAlign: 'right',
  },
  revenueCell: {
    textAlign: 'right',
  },
  amazonCell: {
    textAlign: 'right',
  },
  bsrCell: {
    textAlign: 'right',
  },
  fbaCell: {
    textAlign: 'right',
  },
  deleteBtnCell: {
    textAlign: 'center',
  },
  deleteBtn: {
    color: 'rgba(189, 194, 209, 1)',
  },
  startIcon: {
    color: '#C8CED3',
    fontSize: '22px',
  },
  selectedStarIcon: {
    color: '#FFC632',
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

  totalCell: {
    minWidth: '110px',
  },

  destinationSelect: {
    minWidth: '150px',
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
    WebkitLineClamp: 3,
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
    color: theme.palette.text.general,
  },

  storekeeperSelectCell: {
    width: '150px',
  },

  row: {
    border: '1px solid rgba(0,0,0, .1)',
  },

  sumsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 0',
    // marginBottom: '-20px',
    // gap: '45px',
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
    // display: 'flex',
    width: 'min-content !important',

    margin: '0 !important',
  },
  labelField: {
    fontSize: '14px',
    color: theme.palette.text.general,
    lineHeight: '17px',
    fontWeight: '600',
    marginRight: '20px',
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
  copyImg: {
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.07)',
    },
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

  errorText: {
    input: {
      color: '#FF1616',
    },
  },

  errorSpace: {
    marginTop: 12,
  },

  errorSpaceInputCell: {
    marginTop: 18,
  },
}))

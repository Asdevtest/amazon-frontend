import {makeStyles} from '@material-ui/core/styles'

export const useClassNames = makeStyles(() => ({
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
    color: 'rgba(61, 81, 112, 1)',
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
    color: 'rgba(189, 194, 209, 1)',
  },
  typoSpan: {
    color: 'rgba(61, 81, 112, 1)',
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
    backgroundColor: 'rgb(0, 123, 255)',
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
    height: '32px',
  },
  barcodeChipHover: {
    '&:hover, &:focus': {
      backgroundColor: 'rgb(0, 123, 255)',
    },
  },
  barcodeChipIcon: {
    color: 'rgba(255,255,255,0.26)',
    '&:hover, &:focus': {
      color: 'rgba(255,255,255,0.46)',
    },
  },
  barcodeChipExists: {
    backgroundColor: 'rgb(61, 81, 112)',
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

  commentInput: {
    height: '60px',
    // width: '200px',
  },

  amazonTitle: {
    // maxWidth: '200px',
    maxHeight: '110px',
    overflowX: 'auto',
    marginBottom: '5px',
  },

  storekeeperSelectCell: {
    width: '150px',
  },

  row: {
    border: '1px solid rgba(0,0,0, .1)',
  },

  sumsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 0',
    marginBottom: '-20px',
    gap: '45px',
  },

  containerField: {
    display: 'flex',
    width: 'min-content',
  },
  labelField: {
    fontSize: '14px',
    color: '#001029',
    lineHeight: '17px',
    fontWeight: '600',
    marginRight: '20px',
    whiteSpace: 'nowrap',
  },

  sumText: {
    fontSize: '14px',
    color: '#001029',
    lineHeight: '16px',
    fontWeight: '400',
    whiteSpace: 'nowrap',
  },

  cell: {
    padding: '0 20px',
  },
}))

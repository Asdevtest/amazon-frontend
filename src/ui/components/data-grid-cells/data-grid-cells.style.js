import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  img: {
    backgroundColor: 'rgba(61, 81, 112, 1)',
    height: '64px',
    width: '64px',
    borderRadius: '2px',
    verticalAlign: 'middle',
    marginRight: '16px',
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
    maxWidth: '300px',
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

  order: {
    display: 'flex',
    alignItems: 'center',
  },
  orderImg: {
    height: '64px',
    width: '64px',
    marginRight: '12px',
  },
  orderTitle: {
    fontWeight: 500,
    whiteSpace: 'nowrap',
    maxWidth: '300px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  orderText: {
    fontSize: '14px',
  },
  orderChip: {
    backgroundColor: 'rgb(0, 123, 255)',
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
  },
  orderChipHover: {
    '&:hover, &:focus': {
      backgroundColor: 'rgb(0, 123, 255)',
    },
  },
  orderChipIcon: {
    color: 'rgba(255,255,255,0.26)',
    '&:hover, &:focus': {
      color: 'rgba(255,255,255,0.46)',
    },
  },
  tooltip: {
    fontSize: '13px',
    margin: '0px',
  },
  orderTextSpan: {
    color: 'rgb(189, 194, 209)',
  },
  select: {
    backgroundColor: 'rgb(61, 81, 112)',
  },

  defaultOrderSpan: {
    color: 'rgba(0, 123, 255, 1)',
  },
  changeOrderSpan: {
    color: 'rgb(16, 179, 49)',
  },
  description: {
    color: '#939292',
    textDecoration: 'line-through',
  },
  centerTextCell: {
    textAlign: 'center',
  },
  taskDescriptionImg: {
    width: '40px',
    height: '40px',
  },
  descriptionWrapper: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },

  imagesWrapper: {
    flexDirection: 'column',
    border: '1px solid rgba(0, 123, 255, 0.5)',
    borderRadius: '10px',
    gap: '5px',
    padding: '3px',
    textAlign: 'center',
    display: 'inline-block',
    marginRight: '5px',
  },
  imgNum: {
    margin: '0',
    fontSize: '14px',
  },
  imgWrapper: {
    display: 'flex',
    gap: '2px',
  },
  buttonsWrapper: {
    display: 'flex',
    gap: '10px',
  },
  cancelBtn: {
    marginLeft: '10px',
  },
  blockProductsImagesWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
  },
}))

import {createStyles} from '@material-ui/core'

export const styles = createStyles(() => ({
  img: {
    height: '64px',
    width: '64px',
    marginRight: '16px',
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
    textAlign: 'center',
  },
  feesTableCell: {
    textAlign: 'center',
  },
  feesTableWrapper: {
    width: '100%',
    maxHeight: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rankTableCell: {
    textAlign: 'center',
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
    textAlign: 'center',
  },
  salersTotal: {
    textAlign: 'center',
  },
  typoTableCell: {
    textAlign: 'center',
  },
  revenueCell: {
    textAlign: 'center',
  },
  amazonCell: {
    textAlign: 'center',
  },
  bsrCell: {
    textAlign: 'center',
  },
  fbaCell: {
    textAlign: 'center',
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

  noActivebarCode: {
    width: '170px',
    height: '45px',
    overflowX: 'auto',
  },

  noActiveLink: {
    width: '150px',
    height: '45px',
    overflowX: 'auto',
  },

  order: {
    display: 'flex',
    alignItems: 'center',
  },
  orderImg: {
    height: '64px',
    width: '64px',
    marginRight: '12px',
    objectFit: 'contain',
    objectPosition: 'center',
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
    objectFit: 'contain',
    objectPosition: 'center',
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '3px',
  },
  taskTableCell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  rowCancelBtn: {
    marginLeft: '10px',
    // color: '#fff',
    // backgroundColor: '#ff0000',
    // '&:hover': {
    //   backgroundColor: '#c51a1c',

    //   '@media (hover: none)': {
    //     backgroundColor: '#c51a1c',
    //   },
    // },
    // '&$disabled': {
    //   backgroundColor: 'rgba(210, 35, 35, 0.5)',
    // },
  },

  warehouseMyTasksSuccessBtn: {
    height: '36.5px',
  },

  marginRightBtn: {
    marginRight: '10px',
  },

  superboxTypo: {
    margin: '0',
    color: '#007BFF',
    fontSize: '20px',
    fontWeight: '900px',
  },

  manyItemsImagesWrapper: {
    height: '75px',
    border: '1px solid rgba(0, 123, 255, 0.5)',
    borderRadius: '10px',
    gap: '3px',
    padding: '3px',
    display: 'flex',
    alignItems: 'center',
    marginRight: '5px',
    width: 'min-content',
  },

  manyItemsImgWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },

  manyItemsOrderTitle: {
    fontWeight: 500,
  },

  manyItemsOrderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  scrollingValue: {
    width: '100%',
    overflowX: 'auto',
  },

  normDateCellTypo: {
    fontSize: '10px',
    fontWeight: '600',
  },

  shortDateCellTypo: {
    textAlign: 'center',
    width: '100%',
    whiteSpace: 'pre-line',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
  },

  taskDescriptionScrollWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflowY: 'auto',
    margin: 10,
  },

  smallRowImgWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  batchBoxesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflowY: 'auto',
    height: '100%',
    width: '100%',
    padding: '5px',
  },

  batchProductsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

    border: '1px solid rgba(0, 123, 255, 0.5)',
    borderRadius: '10px',
    padding: '3px',
    marginBottom: '5px',

    maxHeight: 500,
    overflow: 'auto',
  },

  batchProductTitle: {
    whiteSpace: 'nowrap',
    maxWidth: '400px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  needPay: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: '15px',
  },

  OrderCellError: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: '15px',
  },

  trashWrapper: {
    width: '100%',
    display: 'flex',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'inherit',
    outline: 'none',

    '&:hover': {
      backgroundColor: 'inherit',
    },
  },

  trashImg: {
    width: '20px',
    height: '20px',

    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  cancelTaskBtn: {
    marginLeft: '20px',
  },

  multilineTextWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    marginLeft: '6px',
  },

  multilineText: {
    width: '100%',
    textAlign: 'center',
    whiteSpace: 'normal',

    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
  },

  multilineTextAlignLeftWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    marginLeft: '6px',
    // padding: '0 10px',
  },

  multilineTextAlignLeft: {
    width: '100%',
    textAlign: 'left',
    whiteSpace: 'normal',

    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',

    color: '#354256',

    height: '100%',
    textOverflow: 'ellipsis',
  },

  multilineTextHeaderWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textHeaderWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  multilineHeaderText: {
    width: '100%',
    textAlign: 'center',
    whiteSpace: 'normal',

    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '16px',
    padding: '0 10px',
  },

  headerText: {
    width: '100%',
    textAlign: 'left',
    whiteSpace: 'normal',

    color: 'rgba(0, 0, 0, 0.87)',
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '16px',
    padding: '0 10px',
  },

  multilineStatusText: {
    textAlign: 'left',
    whiteSpace: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    padding: '0 10px',
  },

  linkText: {
    color: '#007BFF',
    fontSize: '16px',
    lineHeight: '140%',
    fontWeight: '400',
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },

  blackLinkText: {
    color: '#001029',
    fontSize: '16px',
    lineHeight: '140%',
    fontWeight: '400',
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
      textDecoration: 'none',
      border: 'none',
    },
  },

  renderFieldValueCellText: {
    fontSize: '12px',
  },

  warehouseTariffDatesItem: {
    display: 'flex',
    width: '300px',
    justifyContent: 'space-between',
  },

  warehouseBoxesBtnsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    minWidth: '190px',
  },

  shopsReportBtnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },

  downloadLink: {
    color: '#006CFF',
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  copyImg: {
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  changeChipCellLabel: {
    fontSize: '12px',
  },

  statusText: {
    textTransform: 'uppercase',
  },

  editOrRemoveBtnsCell: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  sabUserWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  userAvatar: {
    width: 136,
    height: 136,
  },

  sabUserInfoWrapper: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 120,
  },

  userEmail: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#001029',
  },

  sabUserRatingWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  sabUserRating: {
    marginLeft: 10,
  },

  userRolesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: 120,
    overflow: 'auto',
    width: '100%',
  },

  userRole: {
    marginBottom: 5,
  },

  tariffRatesWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  userLinkWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  clientTasksActionBtnsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  normalActionBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  warehouseMyTasksBtnsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  actionBtn: {
    display: 'flex',
  },

  successActionBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  // showButton: {
  //   display: 'flex',
  //   justifyContent: 'center',
  // },
}))

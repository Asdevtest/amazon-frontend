export const styles = theme => ({
  img: {
    height: '64px',
    width: '64px',
    marginRight: '16px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  productCellImg: {
    height: '43px',
    width: '43px',
    marginRight: '16px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  productWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  skuAndAsinWrapper: {
    display: 'flex',
    gap: '10px',
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
    position: 'relative',
    width: '100%',
  },
  productCell: {
    padding: '20px 0px',
    height: '88px',
  },
  asinCellContainer: {
    display: 'inline-flex',
    width: '100%',
  },
  csCodeTypoWrapper: {
    width: '100%',
  },

  csCodeTypo: {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    maxWidth: '215px',
    // maxWidth: '100%',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  typoCell: {
    fontSize: '14px',
    lineHeight: '21px',
    color: 'rgba(189, 194, 209, 1)',
  },

  productTypoCell: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    display: 'flex',
    gap: '3px',
  },
  typoSpan: {
    marginLeft: 10,
    color: theme.palette.text.second,
  },

  misSpan: {
    marginLeft: 10,
    color: theme.palette.text.second,
  },
  linkSpan: {
    marginLeft: 10,
    color: theme.palette.primary.main,
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
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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
    backgroundcolor: theme.palette.text.general,
  },

  barcodeChipNoExists: {
    // color: '#F5CF00',
    backgroundColor: '#F5CF00',
    color: '#001029',
  },

  inputValueNoExists: {
    backgroundColor: '#F5CF00',
    color: '#001029',
  },

  chipStock: {
    width: '100%',

    backgroundcolor: theme.palette.text.general,
  },

  changeInput: {
    width: '100%',
    height: 36,
  },

  changeInputIcon: {
    transition: '.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
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
    backgroundcolor: theme.palette.text.general,
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

  ordersImg: {
    width: '30px',
    height: '30px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  taskDescriptionImg: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  descriptionWrapper: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },

  gridEditWrapper: {
    maxWidth: 550,
    // overflow: 'auto',
  },

  superboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  standartBoxWrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'repeat(3, auto)',
    gap: 5,

    maxHeight: 200,
  },

  isOneBoxWrapper: {
    gridAutoFlow: 'row',

    gridTemplateRows: 'repeat(auto, 1fr)',
    gridTemplateColumns: 'repeat(4, min-content)',

    maxHeight: 400,
    overflow: 'auto',
  },

  imagesWrapper: {
    width: 'max-content',

    border: '1px solid #006CFF',
    borderRadius: 4,
    gap: '5px',
    padding: '3px',
    marginRight: '5px',
  },
  imgNum: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.primary.main,
    width: '50px',
  },
  taskDescriptionCountWrapper: {
    marginLeft: 5,
  },

  taskDescriptionSuperBox: {
    fontWeight: 600,
    fontSize: 18,
    color: theme.palette.primary.main,

    marginBottom: 10,
  },

  imgWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
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
    justifyContent: 'flex-start',
    // gap: '3px',
  },

  receiveOrEditWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    gap: 10,
  },

  taskDescriptionIcon: {
    margin: '0 8px',
  },

  sideWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',

    maxWidth: 670,

    // maxWidth: '50%',

    overflow: 'auto',
    padding: '10px 0',
  },

  taskTableCell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  rowCancelBtn: {
    height: '40px',
    width: '166px',
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
    height: '40px',
    width: '166px',
  },

  marginRightBtn: {
    marginRight: '10px',
  },

  superboxTypo: {
    margin: '0',
    color: theme.palette.primary.main,
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

    textAlign: 'center',
  },

  shortDateCellTypo: {
    textAlign: 'center',
    width: '100%',
    whiteSpace: 'pre-line',
    fontSize: '12px',
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
    paddingBottom: 20,
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

  alertText: {
    color: 'red',
    fontWeight: 'bold',
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
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  cancelTaskBtn: {
    marginLeft: '20px',
  },

  superBoxQtyWrapper: {
    width: '100%',
    height: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,

    // marginLeft: '6px',

    padding: '5px 0',
  },

  multilineTextWrapper: {
    width: '100%',
    height: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'start',
    // marginLeft: '6px',

    padding: '5px 0',
  },
  multilineSuperBoxWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  multilineText: {
    width: '100%',
    maxHeight: '100%',
    // userSelect: 'none',
    textAlign: 'center',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    // overflow: 'auto',

    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',

    // textOverflow: 'ellipsis',
    // overflow: 'hidden',

    // display: '-webkit-box',
    // '-webkitLineClamp': 3,
    // '-webkitBoxOrient': 'vertical',
  },

  multilineAsinTextAlignLeft: {
    width: '100%',
    maxHeight: '100%',
    // userSelect: 'none',
    textAlign: 'start',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
  },

  multilineLeftText: {
    textAlign: 'start',
  },

  statusMultilineText: {
    width: '100%',
    maxHeight: '100%',
    textAlign: 'center',
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    // overflow: 'hidden',

    fontWeight: '400',
    fontSize: '10px',
    lineHeight: '16px',
  },

  multilineTextAlignLeftHeaderWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
  },

  multilineTextAlignLeftHeader: {
    width: '100%',
    textAlign: 'left',

    whiteSpace: 'normal',
    textOverflow: 'ellipsis',

    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',

    color: theme.palette.text.general,

    height: '100%',
  },

  multilineTextAlignLeftWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    flexWrap: 'no-wrap',

    // textOverflow: 'ellipsis',
    // overflow: 'hidden',

    // display: '-webkit-box',
    // '-webkitLineClamp': 4,
    // '-webkitBoxOrient': 'vertical',
  },

  multilineTextAlignLeft: {
    width: '100%',
    textAlign: 'left',
    // whiteSpace: 'wrap',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '17px',
    fontFamily: 'inherit',
    border: 'none',
    backgroundColor: 'inherit',
    color: theme.palette.text.general,
    resize: 'none',
    height: '100%',
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
    // textOverflow: 'ellipsis ',

    // whiteSpace: 'normal',

    // // whiteSpace: 'normal',
    // height: 65,
    // textOverflow: 'ellipsis',
    // overflow: 'hidden',

    // display: '-webkit-box',
    // '-webkitLineClamp': 3,
    // '-webkitBoxOrient': 'vertical',
  },

  multilineTextAlignLeftSub: {
    width: '100px',
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

    // color: theme.palette.text.general,
    color: theme.palette.text.general,

    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '14px',
  },

  headerText: {
    width: '100%',
    textAlign: 'left',
    whiteSpace: 'normal',

    color: theme.palette.text.general,

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
    color: theme.palette.primary.main,
    fontSize: '16px',
    lineHeight: '140%',
    fontWeight: '400',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },

  blackLinkText: {
    color: theme.palette.text.general,
    fontSize: '16px',
    lineHeight: '140%',
    fontWeight: '400',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
      textDecoration: 'none',
      border: 'none',
    },
  },

  renderFieldValueCellText: {
    fontSize: '14px',

    whiteSpace: 'nowrap',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  warehouseTariffDatesItem: {
    display: 'flex',
    width: '300px',
    justifyContent: 'space-between',
  },

  warehouseBoxesBtnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'end',
    gap: '10px',
    // minWidth: '190px',
    height: '100%',
    padding: '6px 0',
  },

  warehouseBoxesBtn: {
    width: '210px',
    // height: 'auto',
  },

  shopsReportBtnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },

  downloadLink: {
    color: theme.palette.primary.main,
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  copyImg: {
    width: '20px',
    height: '20px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  copyImgAsin: {
    width: '18px',
    height: '18px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },

  copyAsin: {
    display: 'flex',
    gap: '2px',
    alignItems: 'center',
  },

  changeChipCellLabel: {
    fontSize: '12px',
  },

  statusText: {
    width: '100%',
    textAlign: 'right',
  },

  statusTextChat: {
    fontSize: '18px',
  },

  statusWrapper: {
    // width: '270px',
    display: 'flex',
    justifyContent: 'start',
  },

  editOrRemoveBtnsCell: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
  },
  addPermissionBtn: {
    width: '251px',
  },

  sabUserWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
  },

  userAvatar: {
    width: 100,
    height: 100,
  },

  sabUserInfoWrapper: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 100,
  },

  userEmail: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
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

    alignItems: 'center',
    gap: '10px',
  },
  avatarWrapper: {
    width: '28px',
    height: '28px',
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px 0',
    gap: '10px',
  },

  actionBtn: {
    display: 'flex',
    width: '175px',
    height: '40px',
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

  copyImgButton: {
    backgroundColor: 'inherit',
    padding: 0,
    margin: 0,
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },

  inStockWrapper: {
    width: '100%',
  },

  inStockSubWrapper: {
    width: '100%',

    display: 'flex',

    justifyContent: 'space-between',
    gap: 10,
  },

  fourMonthesStockWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0',
  },

  fourMonthesStockLabel: {
    fontSize: '14px',
    lineHeight: '16px',
    marginBottom: '5px',
  },

  removeOrEditBtn: {
    maxHeight: '40px',
    maxWidth: '40px',
  },

  editOrRemoveIconBtnsCell: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    padding: '20px 0',
  },

  editOrRemoveBtnWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  editOrRemoveBtnText: {
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: '400',
    color: theme.palette.text.second,
  },

  orderStatusText: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: '400',
  },

  orderBoxesWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },

  viewBtn: {
    height: '40px',
  },

  notificationBtnsWrapper: {
    display: 'flex',
    gap: '30px',
  },

  notificationBtn: {
    width: '140px',
    height: '40px',
  },

  userLink: {
    display: 'inline-flex',
  },
  normalizeLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    transition: '.3s ease',
    '&:hover': {
      opacity: '.7',
    },
  },

  shortBoxDimensionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    width: '100%',
    padding: '15px 0 5px',
  },

  shortBoxDimensionsText: {
    fontSize: '14px',
    lineHeight: '16px',
  },

  shortBoxDimensionsButton: {
    width: '100%',
    marginTop: '23px',
  },

  editPaddingButton: {
    marginTop: 0,
  },

  photoWrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
  },

  '@media (max-width: 768px)': {
    actionBtn: {
      height: '30px !important',
    },
    warehouseMyTasksBtnsWrapper: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '5px',
    },

    warehouseMyTasksSuccessBtn: {
      width: '114px',
      height: '36px',
    },

    warehouseMyTasksCancelBtn: {
      width: '114px',
      height: '36px',
    },
  },

  sizesSubWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },

  sizesLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#c4c4c4',
    cursor: 'pointer',
  },

  selectedLabel: {
    color: theme.palette.primary.main,
  },
  selectedIndicator: {
    backgroundColor: '#006CFF',
  },
  toggleItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  indicator: {
    display: 'block',
    backgroundColor: '#006CFF',
    width: '2px',
    height: '10px',
  },
})

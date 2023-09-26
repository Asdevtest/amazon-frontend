export const styles = theme => ({
  img: {
    height: '58px',
    width: '58px',
    marginRight: '16px',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '4px',
    border: `1px solid #E0E0E0`,
  },
  productCellImg: {
    height: '43px',
    width: '43px',
    marginRight: '16px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  orderIdsItemsWrapper: {
    whiteSpace: 'normal',
  },

  manyItemsMainWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  manyItemsMainWrapperTooltip: {
    maxHeight: 260,
    overflow: 'auto',
  },

  checkboxWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  priorityAndChinaDeliveryWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    paddingLeft: '10px',
  },

  clockIcon: {
    width: 5,
    height: 5,
    color: theme.palette.primary.main,
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

  asinCell: {
    padding: '12px 0px',
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
    alignItems: 'center',
    width: '100%',
  },
  csCodeTypoWrapper: {
    width: '100%',
  },
  csCodeTypo: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    maxWidth: '165px',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  typoCell: {
    fontSize: '14px',
    lineHeight: '19px',
    color: 'rgba(189, 194, 209, 1)',
  },

  productTypoCell: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    display: 'flex',
    gap: '3px',
  },

  defaultText: {
    color: theme.palette.text.general,
  },

  typoSpan: {
    color: `${theme.palette.text.second} !important`,
  },

  linkSpan: {
    color: theme.palette.primary.main,
  },

  cellBtn: {
    color: 'rgba(0, 123, 255, 1)',
    paddingTop: '0px',
    paddingBottom: '0px',
    textTransform: 'none',
  },

  feesTableWrapper: {
    width: '100%',
    maxHeight: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  startIcon: {
    color: '#C8CED3',
    fontSize: '22px',
  },

  barcodeChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '13px',
    borderRadius: '7px',
    height: '30px',
    width: '100%',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
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

  barcodeChipNoExists: {
    backgroundColor: '#F5CF00',
    color: '#001029',

    '&:hover, &:focus': {
      color: '#fff',
    },
  },

  inputValueNoExists: {
    backgroundColor: '#F5CF00',
    color: '#001029',
  },

  chipStock: {
    width: '100%',
    minWidth: '125px',
    backgroundcolor: theme.palette.text.general,
  },

  changeInput: {
    width: '100%',
    height: 36,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: '19px',
    padding: 0,
  },

  changeInputComment: {
    width: '100%',
    height: 'auto',
    whiteSpace: 'pre-wrap',
    overflow: 'auto',
    paddingLeft: 5,

    '&::placeholder': {
      fontSize: 14,
    },
  },

  changeInputIcon: {
    color: theme.palette.primary.main,
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
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    padding: '10px 0',
  },

  orderImg: {
    height: 64,
    width: 64,
    // objectFit: 'cover',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: 4,
  },

  orderImageSmall: {
    height: 56,
    width: 56,
  },

  orderImageBig: {
    height: 100,
    width: 100,
  },

  orderTitle: {
    fontSize: '14px',
    fontWeight: 400,
    whiteSpace: 'nowrap',
    maxWidth: 185,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  orderText: {
    fontSize: 13,
    maxWidth: 165,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  asinText: {
    fontSize: 14,
    lineHeight: '19px',
  },

  orderTextSpan: {
    fontSize: 14,
    lineHeight: '19px',
    color: 'rgb(189, 194, 209)',
  },

  select: {
    backgroundcolor: theme.palette.text.general,
  },

  ordersImg: {
    width: '30px',
    height: '30px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  taskDescriptionImg: {
    width: '100%',
    maxHeight: '30px',
    height: '100%',
    objectPosition: 'center',

    [theme.breakpoints.down(1282)]: {
      width: 39,
      height: 39,
    },
  },

  gridEditWrapper: {
    // maxWidth: 550,
    display: 'flex',
    flexWrap: 'no-wrap',
    gap: 16,
    marginRight: 10,
  },

  gridBoxesWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 5,
  },

  superboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    marginRight: 5,
  },

  renderBoxWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  standartBoxWrapper: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'repeat(3, auto)',
    gap: 5,

    maxHeight: 200,

    [theme.breakpoints.down(1282)]: {
      gridTemplateColumns: 'none',
    },
  },

  imagesWrapper: {
    width: 'max-content',

    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    gap: '5px',
    padding: '3px',
    marginRight: '5px',
  },

  imgNum: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.primary.main,
  },
  taskDescriptionCountWrapper: {
    marginLeft: 5,
  },
  taskDescriptionSuperBox: {
    fontWeight: 600,
    fontSize: 18,
    color: theme.palette.primary.main,
    wordWrap: 'no-wrap',
    minWidth: 'max-content',
  },

  imgWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '2px',
    marginRight: 20,

    [theme.breakpoints.down(1282)]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },

  gridBoxWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 5,
    marginRight: 20,
  },

  blockProductsImagesWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  receiveOrEditWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    gap: 10,
    height: 50,

    'img:first-of-type': {
      width: 'fit-content',
      height: '100%',
    },
  },

  taskDescriptionIcon: {
    color: theme.palette.primary.main,
    margin: '0 8px',
  },

  sideWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',

    padding: '10px 0',
  },

  taskTableCell: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  rowCancelBtn: {
    height: 30,
    padding: '0 25px',
    [theme.breakpoints.down(1282)]: {
      width: 90,
    },
  },

  warehouseMyTasksSuccessBtn: {
    height: 30,
    width: 166,

    [theme.breakpoints.down(1282)]: {
      width: 90,
    },
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
    alignItems: 'center',
    gap: '2px',
    whiteSpace: 'nowrap',
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
    fontSize: '14px',
    fontWeight: '400',
    textAlign: 'center',

    whiteSpace: 'pre-wrap',

    [theme.breakpoints.down(1282)]: {
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '16px',
    },
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
    overflowX: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflowY: 'auto',
    margin: '10px 0',
    padding: '5px 0',
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
    height: '100%',
    width: '100%',
    padding: '5px',
    maxHeight: '199px',
    overflow: 'auto',
    gap: '5px',
  },

  withScrollBatchBoxesWrapper: {
    justifyContent: 'center',
    gap: 15,
    maxHeight: 'unset',
    overflow: 'unset',
  },

  batchProductsSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },

  batchProductsWrapper: {
    display: 'flex',
    alignItems: 'center',

    border: '1px solid rgba(0, 123, 255, 0.5)',
    borderRadius: '10px',
    padding: '3px',
    width: '100%',
  },

  batchProductInfoWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  amountBoxesWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  amountBoxesText: {
    width: 34,
    fontSize: 14,
    fontWeight: 400,
    whiteSpace: 'nowrap',
    color: theme.palette.primary.main,
  },

  batchProductsBoxesLength: {
    fontSize: 26,
    fontWeight: 600,
    color: theme.palette.primary.main,
    paddingRight: 5,
  },

  batchProductTitle: {
    whiteSpace: 'nowrap',
    maxWidth: 225,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  needPay: {
    color: 'red',
    fontWeight: 'bold',
    width: 'fit-content',
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
    height: 30,
  },

  infoBtn: {
    height: 30,
  },

  superBoxQtyWrapper: {
    width: '100%',
    height: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,

    padding: '5px 0',
  },

  multilineTextWrapper: {
    width: '100%',
    padding: '5px 0',
    overflow: 'hidden',
  },

  illuminationCell: {
    backgroundColor: theme.palette.background.green,
  },

  multilineText: {
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '14px',
    lineHeight: '19px',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  },

  oneMultilineText: {
    height: 19,
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },

  twoMultilineText: {
    maxHeight: 38,

    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },

  threeMultilineText: {
    maxHeight: 57,
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },

  boxesAndQuantityText: {
    whiteSpace: 'normal',
    color: theme.palette.text.general,

    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
  },

  multilineLeftAlignText: {
    textAlign: 'left',
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

  statusMultilineText: {
    whiteSpace: 'normal',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    lineHeight: '19px',
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
    wordBreak: 'break-all',
  },

  commentOfSbWrapper: {
    padding: '5px 0',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  commentOfSbSubWrapper: {
    maxHeight: '100%',
    width: '100%',
    overflow: 'auto',
  },

  commentOfSbSubMultiText: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    lineHeight: '19px',
  },

  multilineTextAlignLeft: {
    width: '100%',
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '19px',
    fontFamily: 'inherit',
    border: 'none',
    backgroundColor: 'inherit',
    color: theme.palette.text.general,
    resize: 'none',
    cursor: 'url(/assets/icons/Cursor.svg) 4 12, auto',
  },

  fourLinesTextAlignLeft: {
    justifyContent: 'center',
    height: 'auto',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
  },

  multilineTextAlignLeftSub: {
    width: '100px',
  },

  multilineTextHeaderWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  multilineTextHeaderCenter: {
    justifyContent: 'center',
  },

  multilineTextHeaderSpaceBetween: {
    justifyContent: 'space-between',
  },

  boxesAndQuantityWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    flexWrap: 'wrap',
  },

  textHeaderWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  multilineHeaderText: {
    width: 'fit-content',
    textAlign: 'center',
    color: theme.palette.text.general,

    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '14px',

    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
  },

  shopOrderText: {
    width: '100%',
    textAlign: 'center',
    color: theme.palette.text.general,

    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '14px',

    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
  },

  adaptText: {
    fontSize: 14,
    fontWeight: 400,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
    justifyContent: 'center',
    gap: '10px',
    height: '100%',
    padding: '6px 0',
  },

  warehouseBoxesBtn: {
    width: 210,
    height: 30,
  },

  shopsReportBtnsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    width: '100%',
  },

  tooltipWrapperMargin: {
    marginRight: '-15px',
  },

  downloadLink: {
    fontSize: 14,
    color: theme.palette.primary.main,
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  copyAsin: {
    width: '100%',
    display: 'flex',
    gap: 5,
    alignItems: 'center',
  },

  boxInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 158,
    gap: 5,
  },

  boxInfoText: {
    fontSize: 13,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  orderTextSpanAsin: {
    color: theme.palette.primary.main,
  },

  flexDirectionColumn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexGrow: 1,
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

    [theme.breakpoints.down(768)]: {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  statusWrapper: {
    display: 'flex',
    justifyContent: 'start',
  },

  editOrRemoveBtnsCell: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
  },

  addPermissionBtn: {
    padding: '0 15px',
  },
  sabUserWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  userAvatar: {
    width: 66,
    height: 66,
  },

  sabUserInfoWrapper: {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  userEmail: {
    color: theme.palette.text.general,

    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
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
    height: 70,
    overflow: 'auto',
    width: '100%',
  },

  userRole: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    marginBottom: 5,
  },

  tariffRatesWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  manyUserLinkWrapper: {
    width: '100%',
    maxWidth: 152,
    overflowX: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  manyUserLinkWrapperStart: {
    display: 'flex',
    justifyContent: 'start',
    paddingBottom: 5,
  },

  userLinkWrapper: {
    width: '100%',
    display: 'flex',

    alignItems: 'center',
    gap: '10px',
  },

  clientTasksActionBtnsWrapper: {
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
    height: 30,
    padding: '0 15px',

    [theme.breakpoints.down(1282)]: {
      fontSize: 13,
      lineHeight: 18,
    },
  },

  copyImgButton: {
    minWidth: 'unset !important',
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

  CommentUsersCellWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 0',
  },

  fourMonthesStockLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: '5px',
  },

  removeOrEditBtn: {
    padding: 0,
    height: 30,
    width: 30,

    '> svg': {
      width: 18,
      height: 18,
    },
  },

  editOrRemoveIconBtnsCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: '15px 0',
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
    height: 30,
  },

  notificationBtnsWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },

  notificationBtn: {
    width: '140px',
    height: '30px',
    padding: '0 12px',
  },

  productMyRequestsBtnsWrapper: {
    display: 'flex',
    width: '100%',
    gap: '30px',
  },

  productMyRequestsBtn: {
    width: '140px',
    height: 30,
  },

  multilineLink: {
    color: theme.palette.primary.main,
    cursor: 'pointer',

    transition: '.3s ease',
    '&:hover': {
      opacity: '.7',
      textDecoration: 'underline',
    },
  },

  headerIcon: {
    width: '14px !important',
    height: '14px !important',
    color: 'gray',
    position: 'absolute',
    right: -15,
    top: 20,
    overflow: 'visible',
  },

  headerIconBlue: {
    color: theme.palette.primary.main,
  },

  userLink: {
    display: 'inline-flex',
  },

  normalizeLink: {
    maxWidth: 140,
    fontSize: 14,
    lineHeight: '19px',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: theme.palette.primary.main,
    textDecoration: 'none',
    transition: '.3s ease',
    '&:hover': {
      opacity: '.7',
    },
  },
  linkWrapper: {
    fontSize: 14,
    lineHeight: '19px',
    cursor: 'pointer',
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
      width: 114,
      height: 30,
    },

    warehouseMyTasksCancelBtn: {
      width: 114,
      height: 30,

      [theme.breakpoints.down(1282)]: {
        width: 90,
      },
    },
  },

  warehouseMyTasksCancelBtn: {
    height: 30,
    width: 166,
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
  fixedTextWidth: {
    width: 35,
  },
  doneIcon: {
    color: theme.palette.text.green,
  },
  clearIcon: {
    width: '20px !important',
    height: '20px !important',
    transition: '.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    color: theme.palette.text.second,
  },
  iconWrapper: {
    display: 'flex',
    gap: 5,
  },
  destinationAndTariffWrapper: {
    padding: '20px 0',
  },
  storekeeperBtn: {
    height: 'auto',
    width: 160,
    marginTop: 10,
    whiteSpace: 'normal',
    color: '#fff',
    background: theme.palette.primary.main,
  },

  cursorPointer: {
    cursor: 'pointer',
  },

  amount: {
    marginLeft: '5px',
  },
  ManyItemsPriceCellMainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5px 0',
    gap: 10,
  },
  pricesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 'auto',
    flexGrow: 1,

    gap: 77,
  },

  searchInputWrapper: {
    width: 160,
    height: 30,
    marginBottom: 10,
  },

  searchInput: {
    border: '1px solid #E0E0E0',
    width: '100%',
    height: '100%',
  },
  userMainWrapper: {
    width: '100%',
    height: '100%',

    display: 'flex',
    gap: 10,
    alignItems: 'center',
  },
  userCellAvatar: {
    width: 28,
    height: 28,
    searchInputWrapper: {
      width: '100%',
      height: 30,
      marginBottom: 10,
    },
    searchInput: {
      border: '1px solid #E0E0E0',
      width: '100%',
      height: '100%',
    },

    stringListMenuWrapper: {
      width: 160,
      padding: '10px',
      maxHeight: 400,
    },

    colorRed: {
      color: '#FF1616 !important',
    },

    colorGreen: {
      color: '#00B746 !important',
      userMainWrapper: {
        width: '100%',
        height: '100%',

        display: 'flex',
        gap: 10,
        alignItems: 'center',
      },
      userCellAvatar: {
        width: 28,
        height: 28,
      },
    },
    userMainWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      colorGreen: {
        color: '#00B746 !important',
      },
    },
  },
  asinCellMainWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    height: '100%',

    gap: 5,
  },

  imgMini: {
    height: 33,
    width: 33,
    objectFit: 'contain',
    objectPosition: 'center',
  },
  attributeWrapper: {
    display: 'flex',
    gap: 5,
  },
  asinAndSkuTitle: {
    display: 'flex',
    justifyContent: 'flex-start',
    whiteSpace: 'pre-wrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '16px',

    color: theme.palette.text.second,
  },
  attributeLink: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.general,
  },
  nativeSelect: {
    [theme.breakpoints.down(1282)]: {
      width: 130,
    },
    '& > div': {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
    },
  },
  attributeMissing: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.second,
  },
  colorRed: {
    color: '#FF1616 !important',
  },

  colorGreen: {
    color: '#00B746 !important',
  },

  operationTypeText: {
    [theme.breakpoints.down(1282)]: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '16px',
    },
  },
  ratingScore: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
  },
  bigBoxSvg: {
    [theme.breakpoints.down(1282)]: {
      width: 47,
      height: 51,
    },
  },
  boxArrowSvg: {
    color: theme.palette.primary.main,

    [theme.breakpoints.down(1282)]: {
      width: 22,
      height: 22,
    },
  },

  cubeIconSvg: {
    color: theme.palette.primary.main,
  },

  boxEditSvg: {
    color: theme.palette.primary.main,

    [theme.breakpoints.down(1282)]: {
      width: 22,
      height: 22,
    },
  },
  ChangeInputCommentCellWrapper: {
    display: 'flex',
    width: '100%',
    padding: '20px 10px',
  },

  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  rushOrderImg: {
    width: '12px',
    height: '13px',
  },

  dapTitle: {
    color: theme.palette.text.second,
    fontSize: '12px',
  },

  dapBtn: {
    padding: '0px 44px',
    height: 30,
    fontSize: '14px',
    maxWidth: '200px !important',
    minWidth: '200px !important',
    lineHeight: 1,
    span: {
      maxWidth: '92px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },

  priceCellWrapper: {
    width: '100%',
    height: '100%',

    display: 'flex',
    gap: 5,
    flexWrap: 'wrap',

    justifyContent: 'center',
    alignItems: 'center',
  },
  priceCellWrapperAlignLeft: {
    justifyContent: 'flex-start',
  },
  priceText: {
    color: theme.palette.text.main,
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '19px',
  },
  newPrice: {
    color: '#FB1D5B',
    fontWeight: 600,
  },
  oldPrice: {
    textDecoration: 'line-through',
  },
  CopyLinkWrapper: {
    width: '100%',

    display: 'flex',
    gap: 5,
  },

  linkText: {
    width: 'fit-content',
    maxWidth: 'calc(100% - 25px)',
  },
  linkTextClass: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    color: theme.palette.primary.main,
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 400,

    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },
  redFlags: {
    padding: '10px 0',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,

    p: {
      padding: 0,
      margin: 0,
    },
  },

  tags: {
    padding: '10px 0',
  },

  tagItem: {
    maxWidth: 130,
    fontSize: 14,
    lineHeight: '19px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  batchTrackingWrapper: {
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
  },

  batchTrackingTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
    margin: '0 !important',
  },

  batchTrackingContainer: {
    margin: '0 !important',
  },

  arrivalDateWrapper: {
    display: 'flex',
  },
  iconWrapperArrivalDate: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentControls: {
    alignSelf: 'flex-end',
    paddingBottom: 20,
  },

  arrivalDateIcon: {
    width: 15,
    height: 15,
  },
  bluelinkText: {
    color: theme.palette.primary.main,
    fontWeight: 400,
    cursor: 'pointer',
  },

  colorYellow: {
    color: '#F3AF00 !important',
  },

  shopsReportBtnsSubWrapper: {
    display: 'flex',
    gap: 15,
  },

  errorInputActive: {
    border: '1px solid red',
  },

  orderIdAndAmountCount: {
    width: 'fit-content',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    p: {
      textAlign: 'right',
      width: 'fit-content',
    },
    div: {
      width: 'fit-content',
    },
  },

  amountWithClocks: {
    display: 'flex',
    gap: 3,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    lineHeight: '19px',

    svg: {
      fontSize: 16,
      color: theme.palette.primary.main,
      stroke: '#fff',
    },
  },
  printIcon: {
    color: theme.palette.primary.main,
  },
  printIconModal: {
    color: '#fff',
  },
  formedCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 5,
  },

  asinCellCopyWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
  },

  selectRowCellWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '5px',
    paddingLeft: 5,
  },

  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '20px',
  },

  shareLinkIconWrapper: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
  },

  shareLinkIcon: {
    color: theme.palette.primary.main,
    width: '21px !important',
    height: '21px !important',
    cursor: 'pointer',
  },

  tooltip: {
    background: theme.palette.primary.main,
  },

  arrow: {
    color: theme.palette.primary.main,
  },

  abbreviatedBatchProductsWrapper: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
  },

  abbreviatedImg: {
    width: 28,
    height: 28,
  },

  abbreviatedTitle: {
    fontSize: 14,
    fontWeight: 400,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  abbreviatedBatchProductInfoWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  abbreviatedWrapperDivider: {
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRight: 'none',
    borderLeft: 'none',
  },

  div: {
    display: 'flex',
    width: 104,
    marginRight: 15,
  },

  ideaActions: {
    display: 'flex',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',

    button: {
      height: 30,
    },
  },

  ideaRequestsControls: {
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    button: {
      height: 30,
      display: 'flex',
      gap: 5,
      minWidth: '155px !important',

      svg: {
        width: 12,
      },
    },
  },

  buttonWithIcon: {
    height: 30,
    display: 'flex',
    gap: 5,

    svg: {
      width: 12,
    },
  },

  ideaSupplier: {
    p: {
      fontSize: 14,
    },
  },

  ideaRequestsWrapper: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    padding: '16px 0',
    height: '100%',
    width: '990px',
    overflowY: 'auto',
  },

  ideaWrapper: {
    padding: '10px 0 ',
    width: '100%',
  },

  ideaProductActionButton: {
    width: '100%',
  },

  secondsTimeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

    p: {
      fontSize: 14,
      fontWeight: 400,
    },
  },

  yellowColor: {
    color: `#C69109`,
  },

  redColor: {
    color: `#D70D0D`,
  },

  abbreviatedBatchProductInfoMainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  abbreviatedBatchProductsSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  abbreviatedBatchProductsWrapperEnd: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  selectedProductWrapper: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
  },

  paymentMethods: {
    cursor: 'pointer',
    width: 150,
    padding: '10px 0',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 5,
  },

  paymentMethod: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
  },

  paymentMethodIcon: {
    width: 19,
    height: 19,
    borderRadius: '50%',
  },

  paymentMethodTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  notificationId: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },

  multipleAsinWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
})

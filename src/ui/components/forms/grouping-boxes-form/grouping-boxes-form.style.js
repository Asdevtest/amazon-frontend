import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    minHeight: 600,
    display: 'flex',
    flexDirection: 'column',

    position: 'relative',
    maxHeight: '85vh',
  },

  boxesWrapper: {
    display: 'flex',
    gap: '40px',

    flexGrow: 1,
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: '36px',
    marginTop: '40px',
    justifySelf: 'flex-end',

    position: 'sticky',
    bottom: 0,
  },

  leftToRedistributeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  leftToRedistribute: {
    color: theme.palette.text.second,
    marginRight: 5,
  },

  modalTitleSubWrapper: {
    display: 'flex',
  },

  standartText: {
    width: 190,
    color: theme.palette.text.general,

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  iconText: {
    color: theme.palette.primary.main,
    marginLeft: 5,
    fontWeight: 600,
    fontSize: 18,
  },

  standartIconWrapper: {
    border: 'none',
  },

  iconWrapper: {
    borderRadius: 4,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: 5,

    display: 'flex',

    width: 190,
  },

  boxHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    marginBottom: 20,
  },

  modalTitleWrapper: {
    width: '100%',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: '30px',
    lineHeight: '40px',
    fontWeight: '600',
    color: theme.palette.text.general,
    marginRight: 20,
  },

  applyButton: {
    height: 26,
    width: 90,
    transition: '0.3s ease',
  },

  applyButtonClicked: {
    backgroundColor: 'green',
    '&: hover': {
      backgroundColor: 'green',
    },
  },

  currentBoxFooter: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '30px',
  },

  box: {
    width: 527,
    // backgroundColor: theme.palette.background.second,
    // boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    // borderRadius: '4px',
    // padding: '20px 17px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  orderWrapper: {
    width: '100%',
    flexGrow: 1,

    backgroundColor: theme.palette.background.second,
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    borderRadius: '4px',
    padding: '20px 17px',
  },

  order: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    // marginBottom: 10,
    width: '100%',

    flexGrow: 1,
  },
  orderInput: {
    width: '79px',
  },
  divider: {
    margin: '0 30px',
  },
  img: {
    width: '66px',
    height: '66px',

    objectFit: 'contain',
    objectPosition: 'center',
  },
  sectionTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    lineHeight: '140%',
  },

  footerTitle: {
    color: theme.palette.text.second,
  },
  miss: {
    color: theme.palette.text.second,
  },

  deleteBtn: {
    color: theme.palette.text.second,
  },

  title: {
    margin: '5px 0',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    // marginRight: '10px',
    width: '299px',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // whiteSpace: 'wrap',

    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    height: 40,
    whiteSpace: 'normal',

    overflow: 'hidden',
    textOverflow: 'ellipsis',

    color: theme.palette.text.general,
  },
  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.second,
    marginRight: theme.spacing(1),
  },

  inputWrapper: {
    border: '1px solid rgba(143, 152, 165, 1)',
    borderRadius: '4px',
    maxWidth: '80px',
    height: '40px',
  },
  input: {
    fontSize: '14px',
    textAlign: 'center',
  },
  heightFieldAuto: {
    height: '420px',
    width: '330px',

    padding: 0,
  },

  itemWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  newBoxes: {
    minWidth: 527,
  },

  bigPlus: {
    // marginTop: 40,
    margin: '15px 0 30px 0',
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  alertText: {
    color: 'red',
  },

  newBoxesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    alignItems: 'center',
  },

  radioWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  boxNum: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  needChooseMainBox: {
    width: '100%',

    color: theme.palette.primary.main,

    marginTop: 100,
    fontSize: 18,

    fontWeight: 600,

    textAlign: 'center',
  },

  sharedItemSubWrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 231px)',
    columnGap: '25px',
    rowGap: '30px',
  },

  itemSubWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    // flexDirection: 'column',
    // rowGap: '30px',
  },

  sizesTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  barCode: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },

  leftToRedistributeCount: {
    color: theme.palette.text.general,
    fontSize: 18,
  },

  barCodeField: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
    // width: '280px',

    color: theme.palette.primary.main,
  },

  storekeeperDisableBtn: {
    // backgroundColor: '#e4e7ea',

    borderRadius: '4px',
    padding: '6px 7px',

    // color: '#001029',

    backgroundColor: theme.palette.input.customDisabled,
  },

  barcodeChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
    width: 230,
    height: '40px',
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
  barcodeChiplabel: {
    width: 350,
    textAlign: 'center',
  },

  barcodeChipExists: {
    backgroundcolor: theme.palette.text.general,
  },

  link: {
    maxWidth: 370,
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },

  modalText: {
    marginBottom: '5px',
  },

  demensionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  storekeeperBtn: {
    height: '40px',
  },

  field: {
    // margin: '0',

    marginBottom: '10px !important',
  },

  amountField: {
    marginBottom: '0 !important',
    width: 'min-content !important',
    gap: 15,
    marginRight: 20,
  },

  fieldInput: {
    height: '40px',
  },

  superBox: {
    color: theme.palette.primary.main,
    fontSize: 20,
  },

  currentBoxTitle: {
    display: 'flex',
    gap: '23px',
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    marginBottom: '10px',
    justifyContent: 'space-between',
  },

  searchCount: {
    color: theme.palette.primary.main,
    fontSize: 14,
  },

  asinWrapper: {
    display: 'flex',
    gap: '10px',
  },

  destinationSelect: {
    height: '40px',
  },
  icon: {
    padding: 4,
  },
  button: {
    height: '40px',
    padding: '0 25px',
  },
  cancelButton: {
    color: theme.palette.text.general,
    backgroundColor: theme.palette.background.general,
  },

  bottomBlockWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  incomingBtnWrapper: {
    display: 'flex',
    justifyContent: 'end',
  },
  tablePanelSortWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '27px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
  tablePanelViewText: {
    fontSize: '14px',
    lineHeight: '19px',
    fontWeight: 400,
    color: theme.palette.primary.main,
  },

  barCodeWrapper: {
    marginLeft: 10,
  },

  marginBox: {
    '&:not(:last-child)': {
      marginBottom: '20px',
    },
  },
  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
    whiteSpace: 'nowrap',
  },
  asinTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },
  asinValue: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.general,
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
  shippingLabelWrapper: {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  quantityLabel: {
    width: 'min-content',
    whiteSpace: 'unset',
  },
  iconWrapperAndboxNum: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
}))

import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    borderRadius: '5px',

    display: 'flex',

    // alignItems: 'stretch',

    gap: 40,
  },
  warehouseInfoWrapper: {},
  ordersWrapper: {
    flexGrow: 1,
  },

  cancelBtn: {
    color: theme.palette.text.general,
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },

  button: {
    marginLeft: '40px',
  },
  subTitle: {
    color: theme.palette.text.second,
  },
  field: {
    width: '100%',
  },
  multiline: {
    height: 'auto',
    width: '100%',

    padding: 0,
  },

  shippingField: {
    width: '230px !important',
  },

  hsCodeBtn: {
    height: 30,
    width: 230,
  },

  commentField: {
    height: 'auto',
  },

  standartText: {
    color: theme.palette.text.general,
  },

  divider: {
    width: '100%',
    flexGrow: 1,
    // margin: '0 -20px',
    // marginTop: theme.spacing(1.25),
    // marginBottom: theme.spacing(2.5),
  },
  submit: {
    marginRight: theme.spacing(2),
  },

  numberInputFieldsBlocksWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
    width: '100%',
    gap: 20,
  },
  numberInputFieldsWrapper: {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    // marginLeft: '10px',
  },
  numberInputField: {
    margin: '0 5px',
  },
  blockOfNewBoxWrapper: {
    height: '100%',

    width: 525,

    padding: '10px 20px',

    backgroundColor: theme.palette.background.second,

    display: 'flex',
    flexDirection: 'column',

    gap: '20px',
  },
  barcodeChip: {
    backgroundColor: 'rgb(0, 123, 255)',
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
    width: '230px',
    height: '30px',
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
  barcodeChiplabel: {
    width: '100%',

    textAlign: 'center',
  },

  barcodeChipExists: {
    backgroundcolor: theme.palette.text.general,
    width: '230px',
  },
  topWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  heightFieldAuto: {
    height: 'auto',
    maxWidth: '380px',
    minWidth: '250px',

    padding: 0,
  },
  commentsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  boxTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 20,
  },
  amountSpan: {
    margin: '0 0 0 20px',
    color: theme.palette.primary.main,
    fontSize: 18,
  },
  imgBox: {
    width: '200px',
    height: '200px',
    objectFit: 'contain',
    transition: '.2s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  photoWrapper: {
    width: '250px',
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },

  boxPhotoWrapper: {
    marginTop: 30,
    width: '250px',
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 20,
  },

  storekeeperBtn: {
    height: '32px',
    width: '230px',
  },

  sizesTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 40,
  },
  successBtn: {
    backgroundColor: '#4CAF50',
    '&:hover': {
      opacity: '0.8',
      backgroundColor: '#4CAF50',
    },
  },

  alertText: {
    color: 'red',
  },

  shareBoxWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 20px 0',
  },

  shareBoxSubWrapper: {
    display: 'flex',
    gap: 20,
    // width: 350,
    justifyContent: 'flex-end',
  },

  destinationSelect: {
    width: '230px',
  },

  fbaShipmentInput: {
    width: '230px',
  },

  editBlockWrapper: {
    backgroundColor: theme.palette.background.second,
    height: '100%',
  },

  disabledNumInput: {
    width: 80,
    height: 40,
    marginLeft: 55,
  },

  editBlockHeaderWrapper: {
    display: 'flex',
    padding: '10px 20px 0',
    gap: 20,
  },

  disabledNumContainer: {
    // width: 230,
  },

  productsWrapper: {
    width: 500,
  },

  productWrapper: {
    padding: '10px 20px 0',
    display: 'flex',
    justifyContent: 'space-between',

    // gap: 20,
    // height: '330px',
    // width: '480px',

    // padding: '10px',
  },

  amazonTitle: {
    display: '-webkit-box',
    '-webkitLineClamp': 3,
    '-webkitBoxOrient': 'vertical',
    maxHeight: 65,
    whiteSpace: 'normal',

    overflow: 'hidden',
    textOverflow: 'ellipsis',

    width: '230px',
    marginBottom: '5px',

    color: theme.palette.text.general,
  },

  asinText: {
    marginLeft: 10,
    color: theme.palette.text.second,
  },

  titleWrapper: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',

    gap: 20,
  },

  title: {
    fontWeight: 600,
    fontSize: 30,

    color: theme.palette.text.general,
  },

  standartLabel: {
    fontSize: 14,
    color: theme.palette.text.second,
  },

  tableTitle: {
    fontWeight: 600,
    fontSize: 16,
    color: theme.palette.text.general,
  },

  productImageClass: {
    width: 197,
    height: 184,
    objectFit: 'contain',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },

  boxImageClass: {
    width: 148,
    height: 151,
    objectFit: 'contain',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
  noBarCodeGlued: {
    color: 'red',
  },
}))

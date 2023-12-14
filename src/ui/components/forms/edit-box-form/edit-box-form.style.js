import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingRight: 10,
  },
  form: {
    borderRadius: '5px',
    display: 'flex',
    gap: 40,
  },

  cancelBtn: {
    color: theme.palette.text.general,
  },

  commentField: {
    height: 'auto',
  },

  inputAccent: {
    outline: '2px solid #F5CF00',
  },

  buttonsWrapper: {
    position: 'sticky',
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
    marginRight: 5,
    marginTop: 20,
  },

  button: {
    padding: '0 20px',
  },

  field: {
    width: '100%',
  },

  heightFieldAuto: {
    height: '86px',
    padding: 0,
  },

  commentLabel: {
    marginBottom: 5,
    fontSize: 14,
    color: theme.palette.text.second,
  },

  containerField: {
    width: 'min-content',
  },
  multiline: {
    height: 'auto',
    width: '100%',

    padding: 0,
  },

  standartText: {
    color: theme.palette.text.general,
  },

  divider: {
    width: '100%',
    flexGrow: 1,
  },

  blockOfNewBoxWrapper: {
    height: '100%',

    minWidth: 350,

    padding: '10px 20px',

    backgroundColor: theme.palette.background.second,

    display: 'flex',
    flexDirection: 'column',

    gap: '20px',
  },
  barcodeChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '13px',
    borderRadius: '8px',
    width: '230px',
    height: '30px',
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
    width: '100%',

    textAlign: 'center',
  },

  barcodeChipExists: {
    backgroundcolor: theme.palette.text.general,
    width: '230px',
  },

  commentsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 40,
  },

  boxTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
  },

  amountSpan: {
    margin: '0 0 0 20px',
    color: theme.palette.primary.main,
    fontSize: 18,
  },

  photoWrapper: {
    width: '250px',
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    gap: 30,
  },

  storekeeperBtn: {
    height: '32px',
    width: '230px',
  },

  storekeeperBtnColored: {
    color: theme.palette.text.negativeMain,
  },

  sizesTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 40,
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
    justifyContent: 'space-between',
  },

  productsWrapper: {
    width: 700,
    overflow: 'hidden',
    padding: '20px 0',
  },

  productWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 660,
    overflow: 'hidden',
  },

  amazonTitle: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
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
    whiteSpace: 'nowrap',
  },

  tableTitle: {
    fontWeight: 600,
    fontSize: 16,
    color: theme.palette.text.general,
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

  itemInput: {
    width: 310,
    height: 40,
    marginLeft: 10,
    textAlign: 'center',
  },

  input: {
    textAlign: 'center',
    fontSize: 16,
  },

  containerTitleField: {
    marginBottom: '5px !important',
  },

  asinTextWrapper: {
    display: 'flex',
    gap: 5,
  },
}))

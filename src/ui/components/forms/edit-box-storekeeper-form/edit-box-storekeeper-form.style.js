import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  form: {
    borderRadius: '5px',
    display: 'flex',
    gap: 40,
  },

  trackNumberPhotoWrapper: {
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 4,
    minWidth: 230,
    width: 'max-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  trackNumberPhoto: {
    width: 230,
    height: 130,
    objectFit: 'contain',
    cursor: 'pointer',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,

    position: 'sticky',
    bottom: 0,
    right: 0,
  },

  field: {
    marginBottom: '10px !important',
    width: '100%',
  },
  multiline: {
    height: 'auto',
    width: '100%',

    padding: 0,
  },

  commentField: {
    height: 'auto',
  },

  divider: {
    width: '100%',
    flexGrow: 1,
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
    justifyContent: 'flex-end',
  },

  fbaShipmentInput: {
    width: '230px',
  },

  editBlockWrapper: {
    backgroundColor: theme.palette.background.second,
    height: '100%',
  },

  disabledNumInput: {
    width: '120px',
    height: 40,
    marginLeft: 55,
  },

  editBlockHeaderWrapper: {
    display: 'flex',
    padding: '10px 20px 0',
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  productsWrapper: {
    width: 700,
  },

  productWrapper: {
    width: '100%',
    padding: '10px 20px 0',
    display: 'flex',
    justifyContent: 'space-between',
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
    margin: 0,
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
    cursor: 'pointer',
  },

  boxImageClass: {
    width: 148,
    height: 151,
    objectFit: 'contain',
    cursor: 'pointer',
  },

  label: {
    marginBottom: 0,
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

  containerField: {
    width: 'min-content',
  },

  checkboxContainer: {
    margin: 0,
  },
}))

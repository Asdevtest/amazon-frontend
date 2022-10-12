import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  product: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fields: {
    display: 'flex',
    '& > div': {
      marginRight: theme.spacing(2),
    },
  },
  img: {
    width: '64px',
    height: '64px',
    marginRight: theme.spacing(2),
    objectFit: 'contain',
    objectPosition: 'center',
  },
  imgWithTitles: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  inputNumber: {
    width: '80px',
  },
  inputText: {
    width: '160px',
  },
  descriptionWrapper: {},
  amazonTitle: {
    whiteSpace: 'nowrap',
    width: '250px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  barCodeTypo: {
    whiteSpace: 'nowrap',
    width: '300px',
    overflowX: 'auto',
  },

  buyerComment: {
    height: '60px',
    width: '300px',
    overflowX: 'auto',
  },

  noBarCodeGlued: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '18px',
  },

  barcodeChip: {
    width: '150px',
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
    backgroundcolor: theme.palette.text.general,
  },

  checkboxContainer: {
    margin: '0',
  },
}))

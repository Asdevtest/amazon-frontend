import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  heightFieldAuto: {
    height: 'auto',
    maxWidth: '380px',
    minWidth: '380px',
  },

  button: {
    marginRight: '10px',
  },

  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonsWrapper: {},
  currentBox: {
    marginBottom: '20px',
  },
  currentBoxFooter: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '60px',
  },
  newBoxes: {
    marginBottom: '20px',
  },
  box: {
    minWidth: '300px',
    marginBottom: '10px',
  },
  order: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    margin: '0 30px',
  },
  img: {
    width: '32px',
    height: '32px',
    marginRight: '4px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  sectionTitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    width: '160px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.secondary,
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

  itemsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },

  barcodeChip: {
    backgroundColor: 'rgb(0, 123, 255)',
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
    width: '300px',
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
    width: '300px',
    textAlign: 'center',
  },

  barcodeChipExists: {
    backgroundColor: 'rgb(61, 81, 112)',
  },

  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  attentionDifStorekeepers: {
    color: 'red',
    fontSize: '14px',
    fontWeight: 'bold',
  },

  modalText: {
    marginBottom: '8px',
  },

  storekeeperBtn: {
    height: '32px',
  },
}))

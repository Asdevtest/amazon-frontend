import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    flexWrap: 'wrap',
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    border: '1px solid rgb(224, 224, 224)',
    borderRadius: '5px',
    padding: '20px',
  },
  warehouseInfoWrapper: {},
  ordersWrapper: {
    flexGrow: 1,
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },

  button: {
    marginLeft: '10px',
  },
  subTitle: {
    color: theme.palette.text.secondary,
  },
  field: {
    flexBasis: '100%',
  },
  multiline: {
    height: 'auto',
    width: '100%',
  },
  divider: {
    width: '100%',
    flexGrow: 1,
    margin: '0 -20px',
    marginTop: theme.spacing(1.25),
    marginBottom: theme.spacing(2.5),
  },
  submit: {
    marginRight: theme.spacing(2),
  },

  numberInputFieldsBlocksWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    gap: '10px',
  },
  numberInputFieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  numberInputField: {
    margin: '0 5px',
  },
  blockOfNewBoxWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
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
  barcodeChipExists: {
    backgroundColor: 'rgb(61, 81, 112)',
  },
  topWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  labelFieldsWrapper: {
    display: 'flex',
  },
  iconBtn: {
    width: '50px',
    height: '50px',
  },
}))

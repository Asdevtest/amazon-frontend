import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '1121px',
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
    color: theme.palette.text.second,
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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    gap: '10px',
  },

  numberInputFieldsBlocksSubWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    gap: '10px',
  },

  numberInputFieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  numberInputField: {
    // margin: '0 5px',
  },
  blockOfNewBoxWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  barcodeChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
    width: '300px',
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
  barcodeChipExists: {
    backgroundcolor: theme.palette.text.general,
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
    backgroundColor: 'inherit',

    '&:hover': {
      backgroundColor: '#e4e4e4',
    },
  },

  checkboxWithLabelWrapper: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '200px',
  },

  hidden: {
    display: 'none',
  },
  checkboxLabel: {
    margin: 0,
    width: '120px',
  },

  checkboxLabelContainer: {
    margin: 0,
    maxWidth: '80px',
    marginRight: '50px',
  },

  deleteBtn: {
    color: 'grey',
  },

  orange: {
    color: '#F3AF00',
  },

  red: {
    color: 'red',
  },

  green: {
    color: 'green',
  },

  destinationWrapper: {
    maxWidth: '400px',
    textAlign: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    color: theme.palette.text.second,
  },
}))

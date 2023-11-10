import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingRight: 10,
  },

  boxesWrapper: {
    display: 'flex',
    gap: '40px',

    flexGrow: 1,
  },
  buttonsWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,

    position: 'sticky',
    bottom: 0,
    right: 0,
    marginRight: 5,
  },

  containerAccent: {
    outline: '2px solid #F5CF00',
    borderRadius: 4,
    padding: 3,
  },

  checkboxContainer: {
    marginBottom: 10,
    alignItems: 'flex-end',
  },

  modalTitleWrapper: {
    width: '100%',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    marginBottom: '40px',
  },
  modalTitle: {
    fontSize: '30px',
    lineHeight: '40px',
    fontWeight: '600',
    color: theme.palette.text.general,
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

  sectionTitle: {
    color: theme.palette.text.general,
    fontSize: '18px',
    lineHeight: '140%',
  },

  input: {
    fontSize: '14px',
    textAlign: 'center',
  },

  sharedItemSubWrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 231px)',
    columnGap: '25px',
    rowGap: '30px',
  },

  barcodeChip: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: '13px',
    borderRadius: '8px',
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

  modalText: {
    marginBottom: '5px',
  },

  storekeeperBtn: {
    height: '40px',
  },

  fieldInput: {
    height: '40px',
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

  button: {
    height: '40px',
    padding: '0 25px',
  },
  cancelButton: {
    color: theme.palette.text.general,
    backgroundColor: theme.palette.background.general,
  },

  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  storekeeperBtnDefault: {
    color: theme.palette.text.general,
  },
}))

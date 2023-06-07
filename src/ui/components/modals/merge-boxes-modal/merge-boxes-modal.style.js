import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  heightFieldAuto: {
    height: '86px',
    padding: 0,
  },

  commentLabel: {
    marginBottom: 5,
    fontSize: 14,
    color: theme.palette.text.second,
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

  inputAccent: {
    outline: '2px solid #F5CF00',
  },

  buttonsWrapper: { display: 'flex', gap: '10px' },

  box: {
    minWidth: '300px',
    marginBottom: '10px',
  },
  order: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },

  img: {
    width: '66px',
    height: '66px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    width: '299px',
    color: theme.palette.text.general,
  },

  input: {
    fontSize: '14px',
    textAlign: 'center',
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
    width: '300px',
    textAlign: 'center',
  },

  barcodeChipExists: {
    backgroundcolor: theme.palette.text.general,
  },

  mainWrapper: {
    display: 'flex',
    gap: '40px',
  },

  attentionDifStorekeepers: {
    color: 'red',
    fontSize: '14px',
    fontWeight: 'bold',
  },

  storekeeperBtn: {
    height: '32px',
    color: theme.palette.text.negativeMain,
  },

  storekeeperBtnDark: {
    color: theme.palette.text.general,
  },

  storekeeperBtnDefault: {
    color: theme.palette.text.general,

    width: 230,
    height: '40px !important',
  },

  field: {
    margin: '0',
  },
  finalBoxWrapper: {
    width: 527,
    backgroundColor: theme.palette.background.second,
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    borderRadius: '4px',
    padding: '20px 17px',
  },

  itemSubWrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 231px)',
    columnGap: '25px',
    rowGap: '30px',
  },

  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },
  fieldInput: {
    height: '40px',
  },
  marginBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  asinWrapper: {
    display: 'flex',
    gap: '10px',
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
  orderInput: {
    width: '79px',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '40px',
  },
  modalAlternateFooter: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    marginTop: '40px',
  },
  button: {
    width: '183px',
    height: '40px',
  },
  cancelButton: {
    color: theme.palette.text.general,
  },
  boxTitle: {
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
    marginBottom: '12px',
  },
  boxPhotoWrapperS: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  standartLabel: {
    fontSize: 14,
    color: theme.palette.text.second,
  },
  boxImageClass: {
    width: 148,
    height: 151,
    objectFit: 'contain',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
  asinTextWrapper: {
    display: 'flex',
    gap: 5,
  },
  customSwitcherWrapper: {
    width: 'fit-content',
  },
}))

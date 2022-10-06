import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  boxesWrapper: {
    display: 'flex',
    gap: '40px',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: '36px',
    marginTop: '40px',
  },

  currentBoxFooter: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: '30px',
  },

  box: {
    width: 527,
    backgroundColor: '#F8F8F8',
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    borderRadius: '4px',
    padding: '20px 17px',
  },
  order: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginBottom: '30px',
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
    color: '#001029',
    fontSize: '18px',
    lineHeight: '140%',
  },
  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    width: '299px',
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // whiteSpace: 'wrap',
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
  heightFieldAuto: {
    height: '376px',
    width: '330px',
  },

  itemWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  itemSubWrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 231px)',
    columnGap: '25px',
    rowGap: '30px',
  },

  barcodeChip: {
    backgroundColor: 'rgb(0, 123, 255)',
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
    width: 230,
    height: '40px',
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
    width: 350,
    textAlign: 'center',
  },

  barcodeChipExists: {
    backgroundColor: 'rgb(61, 81, 112)',
  },

  link: {
    maxWidth: 370,
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },

  modalText: {
    marginBottom: '5px',
  },

  storekeeperBtn: {
    height: '40px',
  },

  storekeeperDisableBtn: {
    backgroundColor: '#e4e7ea',
    borderRadius: '4px',
    padding: '6px 7px',
  },

  field: {
    margin: '0',
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
    color: '#656565',
    marginBottom: '10px',
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
    color: '#001029',
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
    color: '#006CFF',
  },

  marginBox: {
    '&:not(:last-child)': {
      marginBottom: '20px',
    },
  },
  label: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#656565',
  },
  asinTitle: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#656565',
  },
  asinValue: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#001029',
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
}))

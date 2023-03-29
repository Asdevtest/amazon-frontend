import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalText: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    minWidth: '230px',
  },
  nativeSelect: {
    width: '210px',
  },
  numInput: {
    width: '80px',
  },

  numWideInput: {
    width: '300px',
  },

  errorInput: {
    border: '1px solid red',
  },

  deliveredGoodsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 32,
    width: 208,
    background: theme.palette.input.customDisabled,
    borderRadius: 4,
    padding: '0 8px',

    border: '2px solid red',
  },

  deliveredGoodsSuccessWrapper: {
    border: `2px solid #388E3C !important`,
  },

  deliveredGoodsSuccessText: {
    color: '#388E3C',
  },

  deliveredGoodsSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  deliveredGoodsLeftText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 600,
  },

  deliveredGoodsMiddleText: {
    // color: theme.palette.text.disabled,
    color: theme.palette.text.general,
  },

  deliveredGoodsRightText: {
    color: theme.palette.primary.main,
    fontSize: 18,
    fontWeight: 600,
  },

  commentInput: {
    fontSize: '14px',
    height: 'auto',

    marginTop: '2px',

    width: 231,

    padding: 0,
  },
  priceOptionsWrapper: {
    width: '573px',
    marginTop: '30px',
    display: 'inline-block',

    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: '30px',
  },
  // disabledPriceOptionsWrapper: {
  //   opacity: '0.7',
  // },

  noFlexElement: {
    marginBottom: '10px',
  },

  barCodeText: {
    width: 230,
    height: '46px',
    overflowX: 'auto',
    color: theme.palette.text.second,
  },
  barCodeWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    alignItems: 'flex-start',
  },
  totalPriceWrapper: {
    marginTop: '20px',
  },
  totalPrice: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '21px',
  },

  imageFileInputWrapper: {
    width: '500px',
  },

  imagesButton: {
    marginTop: '20px',
  },

  onLineWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
  },

  checkboxWithLabelWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  disableSelect: {
    color: 'rgba(0,0,0, .3)',
  },

  barCodeLinkWrapper: {
    display: 'flex',
  },

  link: {
    maxWidth: '455px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },

  linkPreview: {
    width: '100px',
    height: '60px',
    objectFit: 'contain',
  },

  checkboxLabel: {
    width: '140px',
    height: '50px',
  },

  hidden: {
    display: 'none',
  },

  labelCheckbox: {
    margin: 0,
  },

  checkboxLabelContainer: {
    margin: 0,
  },

  photoWrapper: {
    width: '339px',
    height: '254px',
  },

  photoAndFieldsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  blueLabel: {
    color: theme.palette.primary.main,
  },

  greenLabel: {
    color: '#00B746',
  },

  input: {
    width: '231px',
  },

  inputFullHeight: {
    height: 'auto',
  },

  researchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },

  researchLabel: {
    maxWidth: '231px',

    color: theme.palette.text.second,
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '19px',
  },

  label: {
    maxWidth: '231px',

    color: theme.palette.text.second,
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '19px',
    marginBottom: 10,
    // whiteSpace: 'nowrap',
  },

  yuanToDollarRate: {
    width: '100%',
    display: 'flex',
    gap: '47px',
  },

  checkboxContainer: {
    margin: 0,
  },
  checkbox: {
    padding: 0,
  },

  barCode: {
    display: 'flex',
    gap: 10,
  },

  trackAndHsCodeAndComments: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: 0,
    gap: 30,
  },

  copyImg: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  hsCodeBtn: {
    width: '100%',
    height: 32,
    color: '#fff !important',
  },
  button: {
    height: '40px',
    padding: '0 25px',
    whiteSpace: 'nowrap',
    color: '#fff !important',
  },
  checkboxWithButton: {
    display: 'flex',
  },
  researchPaymentDateWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  inputError: {
    '.Mui-disabled': {
      '-webkit-text-fill-color': 'red !important',
    },
  },

  subUsersWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 270,
  },
  subUsersTitleWrapper: {
    marginBottom: 10,
  },

  subUsersTitle: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  subUsersBodyWrapper: {
    width: 270,
    maxHeight: 175,
    overflowY: 'auto',

    backgroundColor: theme.palette.background.general,

    border: `1px solid ${theme.palette.input.customDisabled}`,
    borderRadius: '4px',

    padding: 5,
  },

  subUsersBody: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    padding: '6px 0 6px 10px',

    backgroundColor: theme.palette.background.general,
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',

    gap: 10,
  },

  supplierPaymentButtonWrapper: {
    width: '100%',
    height: '100%',

    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'end',
  },

  supplierPaymentButton: {
    height: 32,

    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    width: '100%',
    marginBottom: '20px',
    color: '#fff',
  },

  formItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: 0,
    gap: 30,
  },
}))

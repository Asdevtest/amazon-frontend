import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  nativeSelect: {
    width: '210px',
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
  noFlex: {
    display: 'block',
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

  noFlexElement: {
    marginBottom: '10px',
  },

  barCodeText: {
    width: 120,
    height: '46px',
    overflowX: 'auto',
    color: theme.palette.text.second,
  },
  barCodeWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
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

  onLineWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
  },

  checkboxWithLabelWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  barCodeLinkWrapper: {
    display: 'flex',
    width: '50%',
  },

  link: {
    maxWidth: '455px',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },

  checkboxLabel: {
    width: '140px',
    height: '50px',
  },

  gridItem: {
    width: 500,
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

  normalPaymentText: {
    width: 'fit-content',
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
    whiteSpace: 'nowrap',
  },

  whiteNormalPaymentText: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '19px',
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
    width: 130,
  },

  researchLabel: {
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

  trackAndHsCodeAndCommentsSumWrapper: {
    width: '100%',
    display: 'flex',
  },

  button: {
    height: '40px',
    padding: '0 25px',
    whiteSpace: 'nowrap',
    color: '#fff',
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
      WebkitTextFillColor: 'red !important',
    },
  },

  subUsersWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 229,
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
    width: 229,
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',
    marginBottom: '20px',
    color: '#fff',
    gap: 5,
  },

  noPaymentButton: {
    gap: 5,
  },

  formItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    margin: 0,
    gap: 30,
  },

  addIcon: {
    width: '13px !important',
    height: '13px !important',
    color: theme.palette.primary.main,
  },

  carouselImage: {
    height: '100% !important',
    maxHeight: '254px !important',
    width: '100% !important',
    objectFit: 'contain',

    transition: '.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  paymentsBlock: {
    marginTop: 25,
  },

  labelClass: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  partialPaymentWrapper: {
    width: '100%',
    padding: 10,
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
    marginBottom: 20,
  },

  partialPaymentCheckbox: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',

    p: {
      margin: 0,
    },
  },

  partialPaymentFields: {
    display: 'flex',
    gap: 18,
    paddingTop: 15,

    '& > div': {
      margin: 0,
    },

    '.MuiInputBase-root': {
      width: 'unset',
    },
  },

  supplierPaymentButtonBtnWrapperStyle: {
    width: '100%',
  },
}))

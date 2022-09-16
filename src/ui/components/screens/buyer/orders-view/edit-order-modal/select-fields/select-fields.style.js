import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  modalText: {
    color: 'rgba(61, 81, 112, 1)',
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

  commentInput: {
    fontSize: '13px',
    height: 'auto',
    // width: '100%',
    marginTop: '2px',

    width: 231,
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
    width: '300px',
    height: '46px',
    overflowX: 'auto',
  },
  barCodeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    alignItems: 'flex-start',
  },
  totalPriceWrapper: {
    marginTop: '20px',
  },
  totalPrice: {
    color: 'rgba(61, 81, 112, 1)',
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
    color: '#006CFF',
  },

  greenLabel: {
    color: '#00B746',
  },

  input: {
    width: '231px',
  },

  label: {
    maxWidth: '231px',
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
    gap: '20px',
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
}))

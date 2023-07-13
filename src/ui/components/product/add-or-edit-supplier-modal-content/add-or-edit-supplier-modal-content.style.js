import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
    marginBottom: '15px',
  },

  standartText: {
    color: theme.palette.text.general,
  },

  modalContainer: {
    width: '800px',
  },
  titleDivider: {
    margin: '32px -24px',
  },
  fieldsDivider: {
    margin: '32px -24px 20px',
  },
  buttonsWrapperClient: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: '10px',
    marginTop: '16px',
  },

  prevBtnClient: {
    height: '40px',
    alignSelf: 'end',
  },

  saveBtnClient: {
    width: '240px',
    display: 'block',
    marginBottom: '10px',
    backgroundColor: '#4caf50',
    color: 'ffffff',
    '&:hover': {
      backgroundColor: '#009a07',

      '@media (hover: none)': {
        backgroundColor: '#009a07',
      },
    },
  },

  saveBtn: {
    color: '#fff',
  },
  cancelBtn: {
    color: theme.palette.text.general,
    textTransform: 'none',
    marginLeft: '8px',
  },

  commentField: {
    height: 'auto',
    width: '100%',
  },
  bottomWrapper: {
    display: 'flex',
  },

  imageFileInputWrapper: {
    width: '798px',
  },

  makeMainSupplierСheckboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    transition: '.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  disabledCheckboxWrapper: {
    cursor: 'auto',
    '&:hover': {
      transform: 'none',
    },
  },

  checkbox: {
    padding: 0,
    marginRight: 10,
  },

  nameBlock: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  nameBlockFlexStart: {
    alignItems: 'flex-start',
  },

  nameContainer: {
    width: '380px !important',
  },

  linkContainer: {
    width: '590px !important',
  },

  middleContainer: {
    width: '190px !important',
    marginBottom: 20,
  },

  shortContainer: {
    width: '120px !important',
  },

  normalLabel: {
    marginBottom: 15,
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    maxWidth: 250,
  },

  costBlock: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  rateLabel: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    whiteSpace: 'nowrap',
  },

  rateContainer: {
    display: 'flex',
    gap: 5,
    width: 'auto !important',
  },

  calculationMainWrapper: {
    display: 'flex',
  },

  divider: {
    margin: '35px 10px 10px 10px',
  },

  sizesSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sizesBottomWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
  },

  sizesWrapper: {
    display: 'flex',
    flexDirection: 'column',

    width: '270px',
  },

  sizeContainer: {
    width: '100px',
  },
  sizeInput: {
    width: '85px',
  },

  boxInfoWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  boxInfoSubWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 20,
  },

  boxInfoExtraSubWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  calculationBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  link: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    color: theme.palette.primary.main,
    maxWidth: '100%',
    overflow: 'auto',
  },

  photoAndFilesWrapper: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
  },

  paymentsBlock: {
    display: 'flex',
    alignItems: 'center',
  },

  courseInput: {
    width: 95,
  },
}))

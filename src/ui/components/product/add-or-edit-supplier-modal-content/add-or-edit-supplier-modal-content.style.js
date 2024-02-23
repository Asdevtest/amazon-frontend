import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalTitle: {
    color: theme.palette.text.general,
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '28px',
  },

  modalContainer: {
    width: '840px',
    padding: 20,
  },
  titleDivider: {
    margin: '30px 0',
  },
  fieldsDivider: {
    margin: '20px 0 20px',
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
    margin: '0px !important',
  },

  normalLabel: {
    marginBottom: '10px !important',
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
    marginBottom: '10px !important',
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

  boxInfoMainWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: '10px',
  },

  boxInfoWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  boxInfoSubWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
    gap: '15px',
    width: '320px',
  },

  boxInfoExtraSubWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  calculationBtnWrapper: {
    marginTop: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  link: {
    cursor: 'pointer',
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

  unitDimensionsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  unitDimensionsSubWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '320px',
  },
}))

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
  },
  titleDivider: {
    margin: '20px 0',
  },

  saveBtnWrapperClient: {
    display: 'flex',
    gap: '10px',
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

  commentField: {
    height: 'auto',
    width: '100%',
  },
  bottomWrapper: {
    display: 'flex',
    justifyContent: 'center',
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
    alignItems: 'flex-end',
  },

  nameContainer: {
    width: '380px !important',
  },

  linkContainer: {
    width: '290px !important',
  },

  middleContainer: {
    width: '190px !important',
  },

  shortContainer: {
    width: '160px !important',
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
    margin: '35px 10px 20px 10px',
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
    gap: 20,
  },

  boxInfoSubWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
    gap: '15px',
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
    width: '100%',
    padding: '4px 0',
    display: 'inline-block',
    color: theme.palette.primary.main,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
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
    gap: 20,
  },

  unitDimensionsSubWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  needAddPhotos: {
    color: theme.palette.text.red,
  },

  error: {
    borderColor: 'red',
  },

  flexContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0 20px',
  },
}))

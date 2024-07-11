import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    position: 'relative',
  },

  modalTitle: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  nameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  fieldsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  fieldLabel: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.second,

    marginBottom: '5px !important',
  },

  fieldContainer: {
    width: '278px !important',
    margin: '0 !important',
  },

  destinationContainer: {
    width: '171px !important',
    margin: '0 !important',
  },

  fieldInput: {
    width: '100%',
    height: 40,
  },

  deliveryFieldInput: {
    width: '60%',
  },

  tariffFieldInput: {
    maxWidth: 214,
  },

  rateWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 32,
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 12,
    background: theme.palette.background.general,
    position: 'absolute',
    top: 46,
    right: 29,
    padding: '13px 13px 17px 8px',
    boxShadow: `0px 2px 10px 2px ${theme.palette.boxShadow.general}`,
  },

  customSwitcherWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
  },

  customSubMainWrapper: {
    width: 278,
  },

  destinationWrapper: {
    width: '250px !important',
  },

  destinationSearchInput: {
    height: 40,
    border: `1px solid ${theme.palette.input.customBorder}`,
    marginBottom: 5,
  },

  customSearchInput: {
    width: 239,
    height: 40,

    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 4,
    marginBottom: 5,
  },

  fieldNameStyles: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',

    color: theme.palette.text.general,
  },

  customItemsWrapper: {
    padding: 9,
    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
    maxHeight: '200px !important',
  },

  buttonStyles: {
    padding: '0 0 0 10px',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
  },

  fieldNamesWrapperStyles: {
    height: '40px !important',
  },

  currentRateWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 5,
    marginBottom: 20,
  },

  rateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  currentRate: {
    margin: '0 !important',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.second,
  },

  currentRateText: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '22px',

    color: theme.palette.text.general,
  },

  rateFieldInput: {
    width: 65,
  },

  rateFieldContainer: {
    margin: '0 !important',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 5,
    width: 'fit-content !important',
  },

  currencyStyle: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  regionsWrapper: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },

  regionWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    gap: 5,
  },

  regionContainer: {
    width: '80px !important',
    margin: '0 !important',
  },

  deadlineError: {
    borderBottom: '1px solid red',
  },

  deadlineErrorText: {
    color: 'red',
  },

  dateBlockWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
  },

  blockItemContainer: {
    width: '200px !important',
    margin: '0 !important',
  },

  descriptionField: {
    height: 'auto',
    width: '100%',
    overflowY: 'hidden',

    padding: 0,
  },

  inputClass: {
    padding: '10px 15px',
  },

  shippingDateWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  optionsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
    marginTop: 20,
  },

  weightItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  weightText: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',
  },

  weightMainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    width: 'fit-content',
  },

  weightInput: {
    width: 'fit-content',
    height: 40,
  },

  error: {
    borderColor: 'red',
  },

  weightContainer: {
    width: 'fit-content !important',
    margin: '0 !important',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: 40,
  },

  controlOptionsButtons: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    display: 'flex',
    gap: 10,
    paddingTop: 28,
    minWidth: 53,
  },

  minBoxWeightContainer: {
    maxWidth: 210,
  },

  minBoxWeightWrapper: {
    marginBottom: 20,
  },

  minBoxWeightFieldLabel: {
    marginTop: -19,
  },

  minBoxWeightContainerBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    height: 30,
  },

  datePickerIcon: {
    marginRight: 10,
    '&&': {
      fill: theme.palette.primary.main,
    },
  },

  applyToAll: {
    lineHeight: '19px',
    alignItems: 'center',
    gap: 10,
  },
}))

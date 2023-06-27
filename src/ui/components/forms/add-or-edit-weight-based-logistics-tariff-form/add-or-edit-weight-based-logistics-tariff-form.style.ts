import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: 624,

    display: 'flex',
    flexDirection: 'column',

    gap: 30,
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

  regionFieldInput: {
    width: '80px !important',
    height: 40,
  },

  rateWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
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
    alignItems: 'center',
    gap: 10,
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
    gap: 10,
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

    gap: 10,
  },

  regionContainer: {
    width: '173px !important',
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
    width: '180px !important',
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
    marginTop: 20,
  },

  weightItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  weightText: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '140%',
  },

  weightMainWrapper: {
    display: 'flex',
    gap: 15,
    width: 'fit-content',
  },

  weightInput: {
    width: 80,
    height: 40,
  },

  error: {
    borderColor: 'red',
  },

  weightContainer: {
    width: 'fit-content !important',
    margin: '0 !important',
  },

  plusIcon: {
    width: '11px !important',
    height: '11px !important',
    color: '#FFFFFF',
  },

  plusButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 21,
    minWidth: 'unset !important',
    height: 21,
    padding: 0,
  },

  regionMainWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: 40,
  },

  button: {
    padding: '0 43px',
  },

  cancelBtn: {
    color: theme.palette.text.general,
    padding: '0 35px',
  },

  controlOptionsButtons: {
    display: 'flex',
    gap: 10,
  },
}))

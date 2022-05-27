import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    minWidth: '500px',
  },

  button: {
    marginLeft: '10px',
  },
  multiline: {
    width: '100%',
    minHeight: '100px',
  },

  descriptionField: {
    height: '100px',
    width: '100%',
    overflowY: 'hidden',
  },

  allowUrlsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  urlInputWrapper: {
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
  },

  httpMethodSelect: {
    height: '65px',
    width: '95px',
  },

  urlInput: {
    overflowY: 'auto',
    whiteSpace: 'wrap',
    height: '65px',
    marginRight: '20px',
    width: '450px',
  },

  form: {
    marginTop: '20px',
    width: '630px',
  },

  btnsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  nameDeliveryWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  longContainer: {
    width: '260px',
  },

  blockWrapper: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  fieldLabel: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '140%',
    color: '#354256',
  },

  blockItem: {
    width: '200px',
  },

  deadlineError: {
    borderBottom: '1px solid red',
  },
  deadlineErrorText: {
    color: 'red',
  },

  costBlock: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  rateContainer: {
    width: 'auto',
  },

  rateLabel: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '16px',
    whiteSpace: 'nowrap',
  },

  rightMargin: {
    marginRight: '10px',
  },

  middleInput: {
    width: '80px',
  },
}))

import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  button: {
    marginLeft: '10px',
  },
  conditionsField: {
    width: '100%',
    minHeight: '300px',
    color: theme.palette.text.general,
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',
    fontWeight: '400',
    lineHeight: '1.5',
  },

  nameField: {
    width: '100%',
    minHeight: '60px',
    color: theme.palette.text.general,
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',
    fontWeight: '400',
    lineHeight: '1.5',
  },

  rangeField: {
    width: '250px',
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  deadlineError: {
    borderBottom: '1px solid red',
  },
  deadlineErrorText: {
    color: 'red',
  },

  chooseRequestTypeBtnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '500px',
    height: '300px',
    gap: '20px',
  },

  title: {
    marginBottom: '20px',
  },
}))

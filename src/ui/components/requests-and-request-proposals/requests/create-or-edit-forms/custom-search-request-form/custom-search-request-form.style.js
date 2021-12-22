import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  button: {
    marginLeft: '10px',
  },
  conditionsField: {
    width: '100%',
    minHeight: '40vh',
    color: 'rgba(61, 81, 112, 1)',
    padding: '8px',
    fontSize: '16px',
    outline: 'none',
    border: '1px solid rgba(217, 222, 229, 1)',
    borderRadius: '10px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontWeight: '400',
    lineHeight: '1.5',
  },

  nameField: {
    width: '100%',
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
